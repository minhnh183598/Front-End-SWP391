import styles from './Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('wrapper')}>
            Admin
        </div>
    );
}

export default Admin;