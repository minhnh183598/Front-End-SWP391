import classNames from 'classnames/bind';
import styles from './ApplicationList.module.scss';
import PetImages from '~/assets/images/petImg';
import { Pagination } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ApplicationList() {
    const [currentPage, setCurrentPage] = useState(1);

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
    const appliPerPage = 6;
    const indexOfLastPet = currentPage * appliPerPage;
    const indexOfFirstPet = indexOfLastPet - appliPerPage;
    const appliPage = data.slice(indexOfFirstPet, indexOfLastPet);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <ul>
                    <li>All</li>
                    <li>Passed</li>
                    <li>In Process</li>
                    <li>Not Passed</li>
                </ul>
            </div>

            <div className={cx('sort')}>
                <label htmlFor="sort">Sort</label>
                <select id="sort" name="sort" value=''>
                    <option value="all">All</option>
                    <option value="createDate">Create Date</option>
                    <option value="finishDate">Finish Date</option>
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
                                <button className={cx('feedback')}>View Feedback</button>
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
