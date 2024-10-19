import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import { Pagination } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TaskList({ setUndertakeTask }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSort, setActiveSort] = useState('ALL');
    const [filter, setFilter] = useState({
        state: 'ALL',
        sort: 'DESC',
        sortBy: 'createdAt',
    });

    const data = [
        {
            id: 1,
            name: `Visit customer's home`,
            state: 'Available',
            createDate: '20/11/2024',
            finishDate: '',
        },
        {
            id: 2,
            name: 'Feed the pets',
            state: 'Available',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 3,
            name: 'Participate in event organization',
            state: 'Unavailable',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 4,
            name: 'Feed the pets',
            state: 'Available',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 5,
            name: 'Participate in event organization',
            state: 'Unavailable',
            createDate: '20/11/2024',
            finishDate: '',
        },
        {
            id: 6,
            name: `Visit customer's home`,
            state: 'Unavailable',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 7,
            name: 'Feed the pets',
            state: 'Available',
            createDate: '20/11/2024',
            finishDate: '',
        },
    ];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const newSort = value == 'createdAt' ? 'DESC' : value == 'finishAt' ? 'DESC' : filter.sort;

        setFilter((prev) => ({
            ...prev,
            [name]: value,
            sort: newSort,
        }));
    };

    const appliPerPage = 6;
    const indexOfLastPet = currentPage * appliPerPage;
    const indexOfFirstPet = indexOfLastPet - appliPerPage;
    const appliPage = data.slice(indexOfFirstPet, indexOfLastPet);
    return (
        <>
            <div className={cx('header')}>
                <ul>
                    <li
                        className={cx({ active: activeSort == 'ALL' })}
                        onClick={() => {
                            setActiveSort('ALL');
                            setFilter((prev) => ({ ...prev, role: 'ALL' }));
                            setCurrentPage(1);
                        }}
                    >
                        View All
                    </li>
                    <li
                        className={cx({ active: activeSort == 'Available' })}
                        onClick={() => {
                            setActiveSort('Available');
                            setFilter((prev) => ({ ...prev, role: 'Available' }));
                            setCurrentPage(1);
                        }}
                    >
                        Available
                    </li>
                    <li
                        className={cx({ active: activeSort == 'Unavailable' })}
                        onClick={() => {
                            setActiveSort('Unavailable');
                            setFilter((prev) => ({ ...prev, role: 'Unavailable' }));
                            setCurrentPage(1);
                        }}
                    >
                        Unavailable
                    </li>
                    <li
                        className={cx({ active: activeSort == 'Undertook' })}
                        onClick={() => {
                            setActiveSort('Undertook');
                            setFilter((prev) => ({ ...prev, role: 'Undertook' }));
                            setCurrentPage(1);
                        }}
                    >
                        Undertook
                    </li>
                </ul>
            </div>

            <div className={cx('sort')}>
                <label htmlFor="sort">Sort</label>
                <select id="sort" name="sort" value={filter.sortBy} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="createdAt">Create Date</option>
                    <option value="finishAt">Finish Date</option>
                </select>
            </div>

            <div className={cx('application-list')}>
                {appliPage.map((appli, index) => (
                    <div className={cx('application-item')} key={index}>
                        <div className={cx('pet-info')}>
                            <div className={cx('detail-info')}>
                                <h4>
                                    <b>{appli.name}</b>
                                </h4>
                                <p>Number of volunteers needed: 1</p>
                                <p className={cx('appli-date')}>Create Date: {appli.createDate}</p>
                                <p className={cx('appli-date')}>Finish Date: {appli.finishDate}</p>
                            </div>
                            <div className={cx('appli-state')}>
                                <p className={cx('state', appli.state == 'Unavailable' ? 'unavailable' : '')}>
                                    {appli.state}
                                </p>
                                <button className={cx('feedback')} onClick={() => setUndertakeTask('ViewTask')}>
                                    View Task
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={cx('pagination')}>
                    <Pagination
                        style={{ display: 'block' }}
                        current={currentPage}
                        defaultCurrent={1}
                        total={data.length}
                        pageSize={6}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </>
    );
}

export default TaskList;
