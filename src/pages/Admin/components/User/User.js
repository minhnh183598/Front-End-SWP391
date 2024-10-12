import Button from '~/components/Button';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
import { Pagination } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function User() {
    const [currentPage, setCurrentPage] = useState(1);
    const data = [
        {
            id: 23,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'Admin',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 2,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 3,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'Volunteer',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 12,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 978,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 105,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'Volunteer',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 122,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 979,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 106,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'Volunteer',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 127,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 98,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 195,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'Volunteer',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 124,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 9,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'User',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 115,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            role: 'Volunteer',
            noa: 12,
            enrolled: '23/01/2024',
        },
    ];
    const userPerPage = 12;
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage; 
    const currentUser = data.slice(indexOfFirstUser, indexOfLastUser);
    return (
        <>
            <h1>Users</h1>
            <div className={cx('wrapper')}>
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

                        <div className={cx('search')}>
                            <form>
                                <label htmlFor="sort">Sort by</label>
                                <select id="sort" name="sort">
                                    <option value="all">All</option>
                                    <option value="sortByWeight">ID</option>
                                    <option value="sortByAge">Create Date</option>
                                    <option value="sortByName">Number of Application</option>
                                </select>

                                <input type="text" placeholder="Search by name" />
                                <Button primary small type="submit">
                                    Search
                                </Button>
                            </form>
                        </div>
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
                            <div className={cx('content')}>
                                {currentUser.map((user) => (
                                    <div className={cx('content-item')} key={user.id}>
                                        <p className={cx('id')}>#{user.id}</p>
                                        <div className={cx('name')}>
                                            <p className={cx('username')}>{user.username}</p>
                                            <p className={cx('fullname')}>{user.fullname}</p>
                                        </div>
                                        <div className={cx('role')}>
                                            <p
                                                className={cx(
                                                    `${
                                                        user.role == 'Volunteer'
                                                            ? 'volunteer'
                                                            : user.role == 'Admin'
                                                            ? 'admin'
                                                            : ''
                                                    }`,
                                                )}
                                            >
                                                {user.role}
                                            </p>
                                        </div>
                                        <p className={cx('appli')}>{user.noa}</p>
                                        <p className={cx('date')}>{user.enrolled}</p>
                                        <div className={cx('action')}>
                                            <FontAwesomeIcon icon={faEye} className={cx('view-icon')} />
                                            <FontAwesomeIcon icon={faTrash} className={cx('delete-icon')}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('pagination')}>
                            <Pagination
                                style={{ display: 'block' }}
                                current={currentPage}
                                defaultCurrent={1}
                                total={data.length}
                                pageSize={userPerPage}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
