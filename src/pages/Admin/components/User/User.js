import Button from '~/components/Button';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '~/config/axios';
import UserContent from './components/UserContent/UserContent';
import Search from './components/Search/Search';
import ViewUser from './components/ViewUser/ViewUser';

const cx = classNames.bind(styles);

function User() {
    const [currentPage, setCurrentPage] = useState(1);
    const [userList, setUserList] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [viewUser, setViewUser] = useState(false);
    const [userID, setUserID] = useState('');

    const handleUserData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data.result)) {
                setUserList(response.data.result);
                setDataLength(response.data.result.length);
            } else {
                console.error('Dữ liệu trả về không phải là mảng:', response.data.result);
                setUserList([]);
            }
        } catch (error) {
            console.log(error);
            setUserList([]);
        }
    };

    useEffect(() => {
        handleUserData();
    }, [viewUser]);

    const userPerPage = 12;
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUser = userList.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <>
            <div className={cx('wrapper')}>
                <h1>Users</h1>

                {!viewUser ? (
                    <>
                        <div className={cx('user-sum')}>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>231</p>
                                    <p className={cx('item-label')}>Total Account</p>
                                </div>
                                <span>+2.15%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>220</p>
                                    <p className={cx('item-label')}>Total User</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>10</p>
                                    <p className={cx('item-label')}>Total Volunteer</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>2</p>
                                    <p className={cx('item-label')}>Total Admin</p>
                                </div>
                                <span>0%</span>
                            </div>
                        </div>

                        <div className={cx('user-content')}>
                            <div className={cx('header')}>
                                <div className={cx('sort')}>
                                    <p className={cx('active')}>View All</p>
                                    <p>Users</p>
                                    <p>Volunteer</p>
                                    <p>Admin</p>
                                </div>

                                <Search />
                            </div>

                            <div className={cx('main-content')}>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('header-content')}>
                                        <p className={cx('id')}>ID</p>
                                        <p className={cx('name')}>Name</p>
                                        <p className={cx('role')}>Role</p>
                                        <p className={cx('appli')}>Number of application</p>
                                        <p className={cx('date')}>Enrolled</p>
                                        <p className={cx('action')}>Action</p>
                                    </div>

                                    {userList.length === 0 ? (
                                        <p
                                            style={{ textAlign: 'center', marginTop: 16 }}
                                            className={cx('null-pet-list')}
                                        >
                                            No users found
                                        </p>
                                    ) : (
                                        <UserContent
                                            currentUser={currentUser}
                                            setViewUser={setViewUser}
                                            setUserID={setUserID}
                                        />
                                    )}
                                </div>
                                <div className={cx('pagination')}>
                                    <Pagination
                                        style={{ display: 'block' }}
                                        current={currentPage}
                                        defaultCurrent={1}
                                        total={dataLength}
                                        pageSize={userPerPage}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ViewUser id={userID} setViewUser={setViewUser} />
                )}
            </div>
        </>
    );
}

export default User;
