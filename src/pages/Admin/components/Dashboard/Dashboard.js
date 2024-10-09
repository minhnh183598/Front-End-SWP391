import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { ICONS_ADMIN } from '~/assets/icons/adminicon';

const cx = classNames.bind(styles);

function Dashboard() {
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
                            <p className={cx('item-number')}>20</p>
                            <p className={cx('item-label')}>Total Pets</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.petPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>231</p>
                            <p className={cx('item-label')}>Total User</p>
                        </div>
                        <span>
                            <img src={ICONS_ADMIN.userPri} />
                        </span>
                    </div>
                    <div className={cx('dashboard-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>132</p>
                            <p className={cx('item-label')}>Total Application</p>
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
