import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NavBar() {
    return (
        <div className={cx('navbar')}>
                <NavLink to="/about-us" className={cx('nav-item')}>
                    About Us
                </NavLink>
                <NavLink to="/find-a-pet" className={cx('nav-item')}>
                    Find a Pet
                </NavLink>
                <NavLink to="/rehome-pet" className={cx('nav-item')}>
                    Rehome Pet
                </NavLink>
                <NavLink to="/blog" className={cx('nav-item')}>
                    Blog
                </NavLink>
                <NavLink to="/contact" className={cx('nav-item')}>
                    Contact
                </NavLink>
                <NavLink to="/donate" className={cx('nav-item')}>
                    Donate
                </NavLink>
            </div>
    );
}

export default NavBar;