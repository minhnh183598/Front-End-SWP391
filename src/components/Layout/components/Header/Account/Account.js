import { DogIcon, HeartIcon, NotiIcon, UserIcon } from '~/components/Icons/Icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import Menu from '~/components/Menu';

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

    const MENU_ITEMS = [
        {
            label: 'Admin',
            to: '/admin'
        },
        {
            label: 'My Account',
            to:'/account'
        },
        {
            label: 'Log Out',
            to: '/',
            action: handleLogout
        },
    ];

    return (
        <div className={cx('account')}>
            {user ? (
                <>
                    <DogIcon />
                    <HeartIcon />
                    <NotiIcon />

                    <Menu items={MENU_ITEMS}>
                        <span className={cx('username')}>
                            {user.username} <UserIcon />
                        </span>
                    </Menu>
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

// {/* <Tippy content='Account' placement='bottom'
//                         interactive
//                         visible
//                         placeMent='bottom'
//                         render={(attrs) => (
//                             <div className={cx('account-menu')} tabIndex="-1" {...attrs}>
//                                 <Popper>account</Popper>
//                             </div>
//                         )}
//                     >
//                         <span className={cx('username')}>
//                             {user.username} <UserIcon />
//                         </span>
//                     </Tippy> */}
