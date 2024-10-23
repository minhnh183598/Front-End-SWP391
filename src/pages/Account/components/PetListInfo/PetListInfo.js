import classNames from 'classnames/bind';
import styles from './PetListInfo.module.scss';
import PetImages from '~/assets/images/petImg';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const cx = classNames.bind(styles);

function PetListInfo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [petList, setPet] = useState([]);
    const [appliList, setAppliList] = useState([]);
    const [adoptedPet, setAdoptedPet] = useState([]);
    const [activeSort, setActiveSort] = useState('ALL');
    const [filter, setFilter] = useState({
        state: 'ALL',
        sort: 'DESC',
        sortBy: 'createdAt',
    });

    // Lay application
    const getApplication = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await api.get(`applications/sorted-by-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const filterApplication = response.data.filter((app) => app.status === 3);
            setAppliList(filterApplication); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la appliList', appliList);

    //Lay Pet Data
    const getPet = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.get(`pets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPet(response.data); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la pet List', petList);

    const filterPetByApplication = () => {
        const applicationPetIds = appliList.map((app) => app.petId);
        const filtered = petList.filter((pet) => applicationPetIds.includes(pet.petId));
        setAdoptedPet(filtered);
    };
    console.log('day la adopted pet: ', adoptedPet);

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

    useEffect(() => {
        getApplication();
        getPet();
    }, []);

    useEffect(() => {
        filterPetByApplication(); // Lọc pet sau khi cả application và pet đã được lấy
    }, [appliList, petList]);

    // console.log('Day la pet color: ', combinedData.petAge);

    const appliPerPage = 6;
    const indexOfLastPet = currentPage * appliPerPage;
    const indexOfFirstPet = indexOfLastPet - appliPerPage;
    const appliPage = adoptedPet.slice(indexOfFirstPet, indexOfLastPet);
    return (
        <div className={cx('wrapper')}>
            <ScrollToTop />
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
                {appliPage.map((appli) => (
                    <div className={cx('application-item')}>
                        <div className={cx('pet-info')}>
                            <img src={appli.petImage} />
                            <div className={cx('detail-info')}>
                                <h4>{appli.petName}</h4>
                            </div>
                            <div className={cx('appli-state')}>
                                <a href={`/my-pet-detail/${appli.petId}`}>View Details</a>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={cx('pagination')}>
                    <Pagination
                        style={{ display: 'block' }}
                        current={currentPage}
                        defaultCurrent={1}
                        total={appliList.length}
                        pageSize={6}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default PetListInfo;
