import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ICONS_ADMIN } from '~/assets/icons/adminicon';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function Dashboard() {
    const [totals, setTotals] = useState({
        totalUser: 0,
        totalPet: 0,
    });

    const [totalAppli, setTotalAppli] = useState(0);
    const [donateData, setDonateData] = useState([]);
    console.log(totalAppli);

    const getDonateData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`payment/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Authorization: `No Auth`,
                },
            });
            setDonateData(response);
            // localStorage.setItem('bloguData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    console.log('Day la donate data: ', donateData);

    // Lay application
    const getApplication = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.get(`applications/status/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTotalAppli(response.data.length);
            console.log('day la appli:  ', response.data);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };

    useEffect(() => {
        getDonateData();
        getApplication();
        const storedTotals = {
            totalUser: localStorage.getItem('totalUser'),
            totalPet: localStorage.getItem('totalPets'),
        };

        setTotals((prev) => ({
            ...prev,
            ...Object.fromEntries(
                Object.entries(storedTotals).map(([key, value]) => [key, value ? JSON.parse(value) : prev[key]]),
            ),
        }));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div className={cx('dashboard-wrapper')}>
                <div className={cx('dashboard-sum')}>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>150.000.000 VND</p>
                            <p className={cx('item-label')}>Total Donation</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.moneyPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>{totals.totalPet}</p>
                            <p className={cx('item-label')}>Total Pets</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.petPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>{totals.totalUser}</p>
                            <p className={cx('item-label')}>Total Users</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.userPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>{totalAppli}</p>
                            <p className={cx('item-label')}>Total Applications</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.appliPri} style={{ width: 20 }} />
                        </span>
                    </div>
                </div>

                <div className={cx('dashboard-main')}></div>
            </div>
        </div>
    );
}

export default Dashboard;
