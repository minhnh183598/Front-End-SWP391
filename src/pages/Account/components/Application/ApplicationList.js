import classNames from 'classnames/bind';
import styles from './ApplicationList.module.scss';
import PetImages from '~/assets/images/petImg';

const cx = classNames.bind(styles);

function ApplicationList() {
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

            <div className={cx('application-list')}>
                <div className={cx('application-item')}>
                    <div className={cx('pet-info')}>
                        <img src={PetImages.cat1} />
                        <div className={cx('detail-info')}>
                            <h4>Luna</h4>
                        </div>
                        <div className={cx('appli-state')}>
                            <p className={cx('state')}>Passed</p>
                            <p className={cx('feedback')}>View Feedback</p>
                        </div>
                    </div>
                    <p className={cx('appli-date')}>Create Date: 20/11/2024</p>
                    <p className={cx('appli-date')}>Finish Date: 22/11/2024</p>
                </div>

                <div className={cx('application-item')}>
                    <div className={cx('pet-info')}>
                        <img src={PetImages.cat1} />
                        <div className={cx('detail-info')}>
                            <h4>Luna</h4>
                        </div>
                        <div className={cx('appli-state')}>
                            <p className={cx('state', 'inprocess')}>In Process</p>
                        </div>
                    </div>
                    <p className={cx('appli-date')}>Create Date: 20/11/2024</p>
                    <p className={cx('appli-date')}>Finish Date: </p>
                </div>

                <div className={cx('application-item')}>
                    <div className={cx('pet-info')}>
                        <img src={PetImages.cat1} />
                        <div className={cx('detail-info')}>
                            <h4>Luna</h4>
                        </div>
                        <div className={cx('appli-state')}>
                            <p className={cx('state', 'notpass')}>Not Passed</p>
                            <p className={cx('feedback')}>View Feedback</p>
                        </div>
                    </div>
                    <p className={cx('appli-date')}>Create Date: 20/11/2024</p>
                    <p className={cx('appli-date')}>Finish Date: 22/11/2024</p>
                </div>
                
            </div>
        </div>
    );
}

export default ApplicationList;
