import {Button} from 'antd';
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

interface Props {
    title?: string;
    text?: string;
}

const ErrorPage = ({
    title = 'Страница не найдена',
    text = 'Инструмент отключён или находится на стадии разработки',
}: Props) => {
    const navigate = useNavigate();

    return (
        <div>
            <span>{title}</span>
            <span>{text}</span>

            <div>
                <Link to="/">
                    <Button type="primary" onClick={() => navigate(-1)}>
                        Вернуться назад
                    </Button>
                </Link>
                <Button>Назад</Button>
            </div>
        </div>
    );
};

export default ErrorPage;
