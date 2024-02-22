import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './success-change-password.module.scss';

export const SuccessChangePassword = () => {
    return (
        <Card
            className={s.card}
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Image
                src='/result/Suggested-Icon.svg'
                className={s.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={s.card__h3}>Пароль успешно изменен</h3>
            <Typography className={s.card__descrip}>
                Теперь можно войти в аккаунт, используя свой логин и новый пароль
            </Typography>
            <Button className={s.card__btn} data-test-id='change-entry-button'>
                <NavLink to={'/auth'}>Вход</NavLink>
            </Button>
        </Card>
    );
};
