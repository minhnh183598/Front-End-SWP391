import { UserIcon } from '~/components/Icons/Icons';
import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import Information from './components/Information';
import ApplicationList from './components/Application/ApplicationList';
import { useState } from 'react';
import VolunteerTasks from './components/Volunteer';

const cx = classNames.bind(styles);

function Account() {
    const [content, setContent] = useState('account');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('account')}>
                    <span className={cx('username')}>
                        <UserIcon /> nnthach
                    </span>
                </div>

                <div className={cx('sidebar-item')}>
                    <p className={cx(content === 'account' ? 'active' : '')} onClick={() => setContent('account')}>
                        Account Information
                    </p>
                    <p className={cx(content === 'appliList' ? 'active' : '')} onClick={() => setContent('appliList')}>
                        Application List
                    </p>
                    <p className={cx(content === 'tasks' ? 'active' : '')} onClick={() => setContent('tasks')}>
                        Volunteer Tasks
                    </p>
                </div>
            </div>
            <div className={cx('content')}>
                {content === 'account' ? (
                    <Information />
                ) : content === 'tasks' ? (
                    <VolunteerTasks />
                ) : (
                    <ApplicationList />
                )}
            </div>
        </div>
    );
}

export default Account;
