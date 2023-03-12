import {Spin} from 'antd';
import React, {Suspense, SuspenseProps} from 'react';

export const SuspenseSpin = ({children}: Omit<SuspenseProps, 'fallback'>) => (
    <Suspense
        fallback={
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Spin size="large" tip="Идёт загрузка данных..." />
            </div>
        }
    >
        {children}
    </Suspense>
);
