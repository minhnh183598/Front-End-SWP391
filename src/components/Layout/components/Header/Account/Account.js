import { DogIcon, HeartIcon, NotiIcon, UserIcon } from '~/components/Icons/Icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Account() {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const hanndleToLogin = () => {
        navigate('/login', { state: { from: window.location.pathname } });
    };

    const handleToRegister = () => {
        navigate('/register', { state: { from: window.location.pathname } });
    };

    const items = [
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/admin">
                    Admin
                </Link>
            ),
        },
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
                    My Account
                </Link>
            ),
        },
        {
            label: (
                <Link
                    style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }}
                    to='/'
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Log Out
                </Link>
            ),
        },
    ];

    return (
        <div className={cx('account')}>
            {user ? (
                <>
                    <DogIcon />
                    <HeartIcon />
                    <NotiIcon />

                    <Dropdown menu={{ items }}>
                        <span className={cx('username')}>
                            <p>{user.username}</p> <UserIcon />
                        </span>
                    </Dropdown>
                </>
            ) : (
                <>
                    <Button mgRight10 medium primary onClick={hanndleToLogin}>
                        Log In
                    </Button>
                    <Button medium outline onClick={handleToRegister}>
                        Register
                    </Button>{' '}
                </>
            )}
        </div>
    );
}

export default Account;
