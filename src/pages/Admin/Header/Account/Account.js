import { DogIcon, HeartIcon, NotiIcon, UserIcon } from '~/components/Icons/Icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Account() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.includes('user')) {
                localStorage.removeItem(key);
            }
        }
        navigate('/');
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
        // moi them
        // {
        //     label: (
        //         <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
        //             My Application
        //         </Link>
        //     ),
        // },
        // {
        //     label: (
        //         <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
        //             My Pet
        //         </Link>
        //     ),
        // },
        /////////////////////////////////////////////////////////////////
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
                    to="/"
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
            {userInfo ? (
                <>
                    <NotiIcon />

                    <Dropdown menu={{ items }}>
                        <span className={cx('username')}>
                            <p>{userInfo.username}</p> <UserIcon />
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
