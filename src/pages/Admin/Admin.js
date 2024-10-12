import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import Dashboard from './components/Dashboard/Dashboard';
import User from './components/User/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCalendarDays, faHouse, faNewspaper, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Pets from './components/Pets/Pets';
import Blogs from './components/Blogs/Blogs';
import Events from './components/Events/Events';
import Application from './components/Application/Application';

const cx = classNames.bind(styles);

function Admin() {
    const [content, setContent] = useState('Dashboard');
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <div
                        className={cx('sidebar-item', { active: content === 'Dashboard' })}
                        onClick={() => setContent('Dashboard')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faHouse} className={cx('icon')} />
                            Dashboard
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Pets' })}
                        onClick={() => setContent('Pets')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faPaw} className={cx('icon')} />
                            Pets
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Users' })}
                        onClick={() => setContent('Users')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                            Users
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Blogs' })}
                        onClick={() => setContent('Blogs')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faBlog} className={cx('icon')} />
                            Blogs
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Events' })}
                        onClick={() => setContent('Events')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} />
                            Events
                        </span>
                    </div>
                    <div
                        className={cx('sidebar-item', { active: content === 'Application' })}
                        onClick={() => setContent('Application')}
                    >
                        <span>
                            <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />
                            Application
                        </span>
                    </div>
                </div>
                <div className={cx('content')}>
                    {content == 'Dashboard' ? (
                        <Dashboard />
                    ) : content == 'Pets' ? (
                        <Pets />
                    ) : content == 'Blogs' ? (
                        <Blogs />
                    ) : content == 'Events' ? (
                        <Events />
                    ) : content == 'Application' ? (
                        <Application />
                    ) : (
                        <User />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
