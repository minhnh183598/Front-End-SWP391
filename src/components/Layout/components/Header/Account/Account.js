import Button from '~/components/Button';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Account() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const role = JSON.parse(localStorage.getItem('userRoles'));
    const isAdmin = role?.includes('ADMIN');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRoles');
        navigate('/');
    };

    const hanndleToLogin = () => {
        navigate('/login', { state: { from: window.location.pathname } });
    };

    const handleToRegister = () => {
        navigate('/register', { state: { from: window.location.pathname } });
    };

    const items = [
        ...(isAdmin
            ? [
                  {
                      label: (
                          <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/admin">
                              Admin
                          </Link>
                      ),
                  },
              ]
            : []),
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/account">
                    My Account
                </Link>
            ),
        },
        // moi them
        // {
        //     label: (
        //         <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/my-application">
        //             Application
        //         </Link>
        //     ),
        // },
        // {
        //     label: (
        //         <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/my-pet">
        //             Pet
        //         </Link>
        //     ),
        // },
        /////////////////////////////////////////////////////////////////////////
        {
            label: (
                <Link style={{ textDecoration: 'none', fontSize: 16, fontWeight: 500 }} to="/" onClick={handleLogout}>
                    Log Out
                </Link>
            ),
        },
    ];

    const data = [
        {
            id: 5,
            name: 'John nguyen alo mot hai ba adoption',
            status: 'Done',
            finishDate: '20-10-2024',
        },
    ];

    return (
        <div className={cx('account')}>
            {userInfo ? (
                <>
                    <div className={cx('noti-wrap')}>
                        <FontAwesomeIcon icon={faBell} className={cx('icon-header')} />
                        <div className={cx('noti-menu')}>
                            {data.map((item) => (
                                <div className={cx('noti-item')} key={item.id}>
                                    <div className={cx('noti-text')}>
                                        <p className={cx('name')}>
                                            <b>{item.name}</b>
                                        </p>
                                        <p className={cx('status')}>{item.status}</p>
                                    </div>
                                    <div className={cx('noti-text')}>
                                        <p className={cx('finish')}>Finish: {item.finishDate}</p>
                                        <p className={cx('view')}>View</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Dropdown menu={{ items }}>
                        <span className={cx('username')}>
                            <p>{userInfo.username}</p>
                            <FontAwesomeIcon icon={faUser} className={cx('icon-user')} />
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
