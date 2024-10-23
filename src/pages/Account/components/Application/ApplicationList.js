import classNames from 'classnames/bind';
import styles from './ApplicationList.module.scss';
import PetImages from '~/assets/images/petImg';
import { Pagination } from 'antd';
import { useState } from 'react';
import React from 'react';

const cx = classNames.bind(styles);

function ApplicationList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [appli, setAppli] = useState(null);
    const [activeSort, setActiveSort] = useState('ALL');
    const [filter, setFilter] = useState({
        state: 'ALL',
        sort: 'DESC',
        sortBy: 'createdAt',
    });

    const data = [
        {
            id: 1,
            image: PetImages.cat1,
            name: 'Luna',
            state: 'Passed',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 2,
            image: PetImages.cat2,
            name: 'Minh',
            state: 'Not Pass',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 3,
            image: PetImages.dog2,
            name: 'HMinh',
            state: 'Passed',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 4,
            image: PetImages.cat1,
            name: 'Minh',
            state: 'Passed',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 5,
            image: PetImages.dog3,
            name: 'Pet',
            state: 'In Process',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 6,
            image: PetImages.dog2,
            name: 'Dog',
            state: 'Not Pass',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
        {
            id: 7,
            image: PetImages.cat1,
            name: 'Luna',
            state: 'In Process',
            createDate: '20/11/2024',
            finishDate: '22/11/2024',
        },
    ];

    const handleUserApplication = async () => {

    }

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
        <div className={cx('wrapper')}>
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
                        className={cx({ active: activeSort == 'Passed' })}
                        onClick={() => {
                            setActiveSort('Passed');
                            setFilter((prev) => ({ ...prev, role: 'Passed' }));
                            setCurrentPage(1);
                        }}
                    >
                        Passed
                    </li>
                    <li
                        className={cx({ active: activeSort == 'InProcess' })}
                        onClick={() => {
                            setActiveSort('InProcess');
                            setFilter((prev) => ({ ...prev, role: 'In Process' }));
                            setCurrentPage(1);
                        }}
                    >
                        In Process
                    </li>
                    <li
                        className={cx({ active: activeSort == 'NotPassed' })}
                        onClick={() => {
                            setActiveSort('NotPassed');
                            setFilter((prev) => ({ ...prev, role: 'Not Passed' }));
                            setCurrentPage(1);
                        }}
                    >
                        Not Passed
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
                            <img src={appli.image} />
                            <div className={cx('detail-info')}>
                                <h4>{appli.name}</h4>
                            </div>
                            <div className={cx('appli-state')}>
                                <p
                                    className={cx(
                                        'state',
                                        appli.state === 'In Process'
                                            ? 'inprocess'
                                            : appli.state === 'Not Pass'
                                            ? 'notpass'
                                            : null,
                                    )}
                                >
                                    {appli.state}
                                </p>
                                <button className={cx('feedback')}>View Application</button>
                            </div>
                        </div>
                        <p className={cx('appli-date')}>Create Date: {appli.createDate}</p>
                        <p className={cx('appli-date')}>Finish Date: {appli.finishDate}</p>
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
        </div>
    );
}

export default ApplicationList;
