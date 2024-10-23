import Button from '~/components/Button';
import styles from './VolunteerApplication.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import AppliContent from './components/AppliContent/AppliContent';
import Search from './components/Search/Search';
import ViewAppli from './components/ViewApplication/ViewAppli';

const cx = classNames.bind(styles);

function VolunteerApplication() {
    const [appliList, setAppliList] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [totalAppli, setTotalAppli] = useState(0);
    const [totalPass, setTotalPass] = useState(0);
    const [totalFail, setTotalFail] = useState(0);
    const [totalProcess, setTotalProcess] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAppli, setViewAppli] = useState(false);
    const [appliID, setAppliID] = useState('');
    const [activeSort, setActiveSort] = useState('View All');

    const handleAppliDataCombined = async () => {
        const token = localStorage.getItem('token');
        try {
            const inProcessResponse = await api.get(`applications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Gọi API để lấy dữ liệu thành công
            const successResponse = await api.get(`applications/status/1`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Gọi API để lấy dữ liệu thất bại
            const failResponse = await api.get(`applications/status/2`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const combinedData = [...successResponse.data, ...failResponse.data, ...inProcessResponse.data];
            console.log(combinedData);
            setDataLength(combinedData.length);
            setTotalAppli(combinedData.length);
            setAppliList(combinedData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAppliData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`applications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataLength = response.data.length;
            console.log(response.data);
            setDataLength(dataLength);
            setTotalProcess(dataLength);
            setAppliList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAppliDataSuccess = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`applications/status/1`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataLength = response.data.length;
            console.log(response.data);
            setDataLength(dataLength);
            setTotalPass(dataLength);
            setAppliList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAppliDataFail = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`applications/status/2`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataLength = response.data.length;
            console.log(response.data);
            setDataLength(dataLength);
            setTotalFail(dataLength);
            setAppliList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleAppliDataCombined();
        handleAppliData();
        handleAppliDataSuccess();
        handleAppliDataFail();
    }, [viewAppli]);

    const appliPerPage = 12;
    const indexOfLastAppli = currentPage * appliPerPage;
    const indexOfFirstAppli = indexOfLastAppli - appliPerPage;
    const currentAppli = appliList.slice(indexOfFirstAppli, indexOfLastAppli);
    return (
        <>
            <div className={cx('wrapper')}>
                <h1>Volunteer Application</h1>

                {!viewAppli ? (
                    <>
                        <div className={cx('user-sum')}>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalAppli}</p>
                                    <p className={cx('item-label')}>Total Application</p>
                                </div>
                                <span>+2.15%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalPass}</p>
                                    <p className={cx('item-label')}>Passed</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalProcess}</p>
                                    <p className={cx('item-label')}>In Process</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                            <div className={cx('user-sum-item')}>
                                <div>
                                    <p className={cx('item-number')}>{totalFail}</p>
                                    <p className={cx('item-label')}>Not Passed</p>
                                </div>
                                <span>-3.5%</span>
                            </div>
                        </div>

                        <div className={cx('user-content')}>
                            <div className={cx('header')}>
                                <div className={cx('sort')}>
                                    <p
                                        className={cx({ active: activeSort == 'View All' })}
                                        onClick={() => {
                                            setActiveSort('View All');
                                            setCurrentPage(1);
                                            handleAppliDataCombined();
                                        }}
                                    >
                                        View All
                                    </p>
                                    <p
                                        className={cx({ active: activeSort == 'Success' })}
                                        onClick={() => {
                                            setActiveSort('Success');
                                            setCurrentPage(1);
                                            handleAppliDataSuccess();
                                        }}
                                    >
                                        Success
                                    </p>
                                    <p
                                        className={cx({ active: activeSort == 'Fail' })}
                                        onClick={() => {
                                            setActiveSort('Fail');
                                            setCurrentPage(1);
                                            handleAppliDataFail();
                                        }}
                                    >
                                        Fail
                                    </p>
                                    <p
                                        className={cx({ active: activeSort == 'In Process' })}
                                        onClick={() => {
                                            setActiveSort('In Process');
                                            setCurrentPage(1);
                                            handleAppliData();
                                        }}
                                    >
                                        In Process
                                    </p>
                                </div>

                                <Search />
                            </div>

                            <div className={cx('main-content')}>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('header-content')}>
                                        <p className={cx('id')}>ID</p>
                                        <p className={cx('user')}>User</p>
                                        <p className={cx('pet')}>Pet</p>
                                        <p className={cx('status')}>Status</p>
                                        <p className={cx('date')}>Create Date</p>
                                        <p className={cx('date')}>Approval Date</p>
                                        <p className={cx('action')}>Action</p>
                                    </div>

                                    {appliList.length === 0 ? (
                                        <p
                                            style={{ textAlign: 'center', marginTop: 16 }}
                                            className={cx('null-pet-list')}
                                        >
                                            No applications found
                                        </p>
                                    ) : (
                                        <AppliContent
                                            currentAppli={currentAppli}
                                            setViewAppli={setViewAppli}
                                            setAppliID={setAppliID}
                                        />
                                    )}
                                </div>
                                <div className={cx('pagination')}>
                                    <Pagination
                                        style={{ display: 'block' }}
                                        current={currentPage}
                                        defaultCurrent={1}
                                        total={dataLength}
                                        pageSize={appliPerPage}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ViewAppli id={appliID} setViewAppli={setViewAppli} />
                )}
            </div>
        </>
    );
}

export default VolunteerApplication;