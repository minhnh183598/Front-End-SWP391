import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import IMAGES from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img src={IMAGES.logo} alt="logo" />
                </Link>
            </div>
        </div>
    );
}

export default Header;