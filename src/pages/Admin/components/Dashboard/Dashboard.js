import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ICONS_ADMIN } from '~/assets/icons/adminicon';

const cx = classNames.bind(styles);

function Dashboard() {
    const [totals, setTotals] = useState({
        totalUser: 0,
        totalPet: 0,
        totalAppli: 0,
    });

    useEffect(() => {
        const storedTotals = {
            totalUser: localStorage.getItem('totalUser'),
            totalPet: localStorage.getItem('totalPets'),
            totalAppli: localStorage.getItem('totalAppli'),
        };

        setTotals((prev) => ({
            ...prev,
            ...Object.fromEntries(
                Object.entries(storedTotals).map(([key, value]) => [key, value ? JSON.parse(value) : prev[key]]),
            ),
        }));
    }, []);

    return (
        <>
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
                            <p className={cx('item-number')}>{totals.totalAppli}</p>
                            <p className={cx('item-label')}>Total Applications</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.appliPri} style={{ width: 20 }} />
                        </span>
                    </div>
                </div>

                <div className={cx('dashboard-main')}></div>
            </div>
        </>
    );
}

export default Dashboard;
