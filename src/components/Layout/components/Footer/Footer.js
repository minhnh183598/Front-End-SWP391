import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import IMAGES from '~/assets/images';
import ICONS from '~/assets/icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('first')}>
                <img src={IMAGES.logo} />
                <div className={cx('first-icon')}>
                    <img src={ICONS.insta} />
                    <img src={ICONS.facebook} />
                </div>
                <p>Copy right @2020</p>
            </div>
            <div className={cx('second')}>
                <h3>Contact Us</h3>
                <a href="/contact">Phone</a>
                <a href="/contact">Email</a>
                <a href="/contact">Address</a>
            </div>
            <div className={cx('third')}>
                <h3>Quick Links</h3>
                <div className={cx('link')}>
                    <div className={cx('para1')}>
                        <a href="/">Home</a>
                        <a href="/about-us">About Us</a>
                        <a href="/contact">Contact</a>
                        <a href="/contact">Address</a>
                    </div>

                    <div className={cx('para2')}>
                        <a href="/blog">Blog</a>
                        <a href="/find-a-pet">Our Pets</a>
                        <a href="/about-us">How we work</a>
                        <a href="/donate">Donate</a>
                    </div>
                </div>
            </div>
            <div className={cx('four')}>
                <h3>Follow Us</h3>
            </div>
        </div>
    );
}

export default Footer;
