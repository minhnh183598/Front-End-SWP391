import classNames from 'classnames/bind';
import styles from './ApplicationList.module.scss';
import PetImages from '~/assets/images/petImg';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const cx = classNames.bind(styles);

function ApplicationList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [appliList, setAppliList] = useState([]);
    const [petList, setPet] = useState([]);
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

<<<<<<< HEAD
            const response = await api.get(`applications/sorted-by-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAppliList(response.data); // Lưu dữ liệu vào state
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

    const convertDate = (isoDateString) => {
        const date = new Date(isoDateString); // Tạo đối tượng Date từ chuỗi ISO
        const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0) và đảm bảo có 2 chữ số
        const year = date.getFullYear(); // Lấy năm

        return `${day}/${month}/${year}`; // Trả về định dạng ngày/tháng/năm
    };

    const combinedData = appliList.map((app) => {
        const pet = petList.find((p) => p.petId === app.petId); // Giả sử ứng dụng có thuộc tính petId
        return {
            ...app,
            petName: pet ? pet.petName : 'Chưa có tên', // Nếu không tìm thấy, hiển thị giá trị mặc định
        };
    });

    console.log(combinedData);

    const getStatusLabel = (status) => {
        switch (status) {
            case 0:
                return 'Waiting';
            case 1:
            case 3:
                return 'Approved';
            case 2:
            case 4:
                return 'Denied';
            default:
                return 'Unknown'; // Trường hợp không xác định
        }
    };

    const getStatusLabelClass = (status) => {
        switch (status) {
            case 0:
                return 'waiting'; // Trạng thái Waiting
            case 1:
            case 3:
                return 'approved'; // Trạng thái Approved
            case 2:
            case 4:
                return 'denied'; // Trạng thái Denied
            default:
                return ''; // Không có lớp cho trường hợp không xác định
        }
    };
=======
    const handleUserApplication = async () => {};
>>>>>>> 4637a5593457a5f1de394e74b9f6912c23380c23

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
        getApplication(); // Gọi hàm để lấy dữ liệu khi component được mount
        getPet();
    }, []); // Chỉ chạy 1 lần khi component được mount

    // console.log('Day la pet color: ', combinedData.petAge);

    const appliPerPage = 6;
    const indexOfLastPet = currentPage * appliPerPage;
    const indexOfFirstPet = indexOfLastPet - appliPerPage;
    const appliPage = combinedData.slice(indexOfFirstPet, indexOfLastPet);
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
                    <option value="createdAt">Create Date</option>
                    <option value="finishAt">Finish Date</option>
                </select>
            </div>

            <div className={cx('application-list')}>
                {appliPage.map((appli) => (
                    <div className={cx('application-item')}>
                        <div className={cx('pet-info')}>
                            <img src={appli.pet.petImage} />
                            <div className={cx('detail-info')}>
                                <h4>{appli.petName}</h4>
                            </div>
                            <div className={cx('appli-state')}>
<<<<<<< HEAD
                                <p className={cx(getStatusLabelClass(appli.status))}>{getStatusLabel(appli.status)}</p>
                                <button className={cx('feedback')}>View Feedback</button>
=======
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
>>>>>>> 4637a5593457a5f1de394e74b9f6912c23380c23
                            </div>
                        </div>
                        <p className={cx('appli-date')}>Create Date: {convertDate(appli.createAt)}</p>
                        {/* <p className={cx('appli-date')}>Finish Date: {appli.finishDate}</p> */}
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

export default ApplicationList;
