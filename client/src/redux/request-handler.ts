import {messages} from '@constants/messages';
import {
    MessageType,
    showNotification,
} from '@src/components/showNotification/show-notification';
import {devLog} from '@src/helpers/dev-log';
import {Any} from '@src/typings';
// eslint-disable-next-line no-restricted-imports
import {AllEffect, CallEffect} from 'redux-saga/effects';
import {put} from 'typed-redux-saga';
import {EffectReturnType, SagaGenerator} from 'typed-redux-saga';
import {EmptyAction, PayloadAction} from 'typesafe-actions';

type SagaEffect =
    | SagaGenerator<Any, CallEffect<Any>>
    | SagaGenerator<Any, AllEffect<SagaGenerator<Any, CallEffect<Any>>>>;

type Action = PayloadAction<string, Any> | EmptyAction<string>;

type ErrorCallback = (error: Any) => Generator;

interface HandlerProps {
    isSuccess: boolean;
    action?: Action;
    message?: string;
}

// для запрета передачи определенных параметров вместе
// например, если передается errorCallback, то
// errorMessage и errorAction передаваться не могут
type DependentProps =
    | {
          errorMessage: string;
          successAction?: Action;
          errorAction?: undefined;
          errorCallback?: undefined;
      }
    | {
          errorMessage?: string;
          successAction?: Action | boolean;
          errorAction: Action;
          errorCallback?: undefined;
      }
    | {
          errorMessage?: undefined;
          successAction?: Action;
          errorAction?: undefined;
          errorCallback: ErrorCallback;
      }
    | {
          errorMessage?: undefined;
          successAction?: Action;
          errorAction?: undefined;
          errorCallback?: undefined;
      };

type RequestHandlerProps<T> = {
    request: T;
    successMessage?: string;
} & DependentProps;

function* handler({isSuccess, action, message}: HandlerProps) {
    if (action) {
        yield put(action);
    }

    if (isSuccess) {
        if (message) {
            showNotification(message, MessageType.Success);
        }
    } else if (message) {
        showNotification(message);
    }
}

export function* requestHandler<T extends SagaEffect>({
    request,
    successMessage,
    errorMessage,
    successAction,
    errorAction,
    errorCallback,
}: RequestHandlerProps<T>) {
    try {
        const response = yield* request;

        if (
            response instanceof Array ||
            response instanceof Blob ||
            response.success
        ) {
            const action =
                typeof successAction === 'boolean'
                    ? errorAction
                    : successAction;

            yield handler({isSuccess: true, action, message: successMessage});

            return response as EffectReturnType<T>;
        }

        const {data} = response;

        throw data?.message || data?.errors || data?.additional
            ? data
            : messages.serverError;
    } catch (error) {
        console.log(error, 'error');
        devLog(request, 'requestHandler');

        yield errorCallback
            ? errorCallback(error)
            : handler({
                  isSuccess: false,
                  action: errorAction,
                  message: errorMessage || error,
              });

        return undefined;
    }
}
