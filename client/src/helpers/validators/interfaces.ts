import {Any} from '@src/typings';
import {Rule, RuleObject} from 'antd/es/form';
import {StoreValue} from 'antd/es/form/interface';

export interface EmailValidator {
    rule: Any;
    value: StoreValue;
    callback: (error?: string) => void;
}

export interface EmailValidatorRule {
    field: string;
    fullField: string;
    type: string;
}
