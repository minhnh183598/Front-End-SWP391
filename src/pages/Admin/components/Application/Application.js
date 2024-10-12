import Button from '~/components/Button';
import styles from './Application.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Application() {
    const [currentPage, setCurrentPage] = useState(1);
    const data = [
        {
            id: 23,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            status: 'Passed',
            createDate: '23/01/2024',
            approvalDate: '24/01/2024',
        },
        {
            id: 3,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            status: 'Not Passed',
            createDate: '23/01/2024',
            approvalDate: '24/01/2024',
        },
        {
            id: 2,
            username: 'nnthach1',
            fullname: 'Nguyễn Ngọc Thạch',
            status: 'In Process',
            createDate: '23/01/2024',
            approvalDate: '24/01/2024',
        },
    ];

    const appliPerPage = 12;
    const indexOfLastAppli = currentPage * appliPerPage;
    const indexOfFirstAppli = indexOfLastAppli - appliPerPage;
    const currentAppli = data.slice(indexOfFirstAppli, indexOfLastAppli);
    return (
        <>
            <h1>Application</h1>
            <div className={cx('wrapper')}>
                <div className={cx('user-sum')}>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>231</p>
                            <p className={cx('item-label')}>Total Application</p>
                        </div>
                        <span>+2.15%</span>
                    </div>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>10</p>
                            <p className={cx('item-label')}>Passed</p>
                        </div>
                        <span>-3.5%</span>
                    </div>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>10</p>
                            <p className={cx('item-label')}>In Process</p>
                        </div>
                        <span>-3.5%</span>
                    </div>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>10</p>
                            <p className={cx('item-label')}>Not Passed</p>
                        </div>
                        <span>-3.5%</span>
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
                                    <option value="sortByID">ID</option>
                                    <option value="sortByDate">Create Date</option>
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
                                <p className={cx('user')}>User</p>
                                <p className={cx('status')}>Status</p>
                                <p className={cx('date')}>Create Date</p>
                                <p className={cx('date')}>Approval Date</p>
                                <p className={cx('action')}>Action</p>
                            </div>
                            <div className={cx('content')}>
                                {currentAppli.map((appli) => (
                                    <div className={cx('content-item')} key={appli.id}>
                                        <p className={cx('id')}>#{appli.id}</p>
                                        <div className={cx('user')}>
                                            <p className={cx('fullname')}>{appli.fullname}</p>
                                        </div>

                                        <div className={cx('status')}>
                                            <p
                                                className={cx(
                                                    appli.status === 'In Process'
                                                        ? 'inprocess'
                                                        : appli.status === 'Not Passed'
                                                        ? 'notpass'
                                                        : null,
                                                )}
                                            >
                                                {appli.status}
                                            </p>
                                        </div>
                                        <p className={cx('date')}>{appli.createDate}</p>
                                        <p className={cx('date')}>{appli.approvalDate}</p>
                                        <div className={cx('action')}>
                                            <FontAwesomeIcon icon={faEye} className={cx('view-icon')} />
                                            <FontAwesomeIcon icon={faTrash} className={cx('delete-icon')} />
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
                                pageSize={appliPerPage}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Application;
