
import styles from './RegisBanner.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function RegisBanner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('text')}>
                <h1>Create Your Future Pet Family!</h1>
                <p>
                    Join a community of pet lovers committed to finding forever homes. Connect, share, and make a
                    difference today!
                </p>
            </div>

            <Button outline large to='/register' className={cx('btn')}>Register</Button>
        </div>
    );
}

export default RegisBanner;
