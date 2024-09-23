import { DogIcon, HeartIcon, NotiIcon, UserIcon } from '~/components/Icons/Icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Account() {
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
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
            {user ? (
                <>
                    <DogIcon />
                    <HeartIcon />
                    <NotiIcon />

                    <Dropdown menu={{ items }}>
                        <span className={cx('username')}>
                            {user.username} <UserIcon />
                        </span>
                    </Dropdown>
                </>
            ) : (
                <>
                    <Button mgRight10 medium primary to="/login">
                        Log In
                    </Button>
                    <Button medium outline to="/register">
                        Register
                    </Button>{' '}
                </>
            )}
        </div>
    );
}

export default Account;
