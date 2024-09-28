import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import IMAGES from '~/assets/images';
import ICONS from '~/assets/icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.contact} alt="banner" />
                <h1>Connect with Us Today!</h1>
            </div>
            <div className={cx('content')}>
                <h1>Contact Us</h1>
                <p>Any question or remarks? Just write us a request!</p>

                <div className={cx('main-content')}>
                    <div className={cx('contact-info')}>
                        <h2>Contact Information</h2>
                        <div className={cx('info-list')}>
                            <span className={cx('info-item')}>
                                <img src={ICONS.phoneBl} className={cx('spe-icon')} />
                                028.123.4567 <br /> 028.321.0123
                            </span>
                            <span className={cx('info-item')}>
                                <img src={ICONS.emailBl} />
                                furryfriendshaven@gmail.com
                            </span>
                            <span className={cx('info-item')}>
                                <img src={ICONS.locateBl} />
                                Ho Chi Minh City
                            </span>
                            <span className={cx('info-item')}>
                                <img src={ICONS.clockBl} className={cx('spe-icon')} />
                                Mon - Fri: 7am - 6pm <br /> Sat - Sun: 10am - 4pm
                            </span>
                        </div>
                    </div>
                    <div className={cx('request-form')}>
                        <h2>Get a Request Now</h2>
                        <form>
                            <div className={cx('form-list')}>
                                <div className={cx('form-item')}>
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" name="fname" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" name="lname" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="phone" id="phone" name="phone" />
                                </div>
                                <div className={cx('form-item')}>
                                    <label htmlFor="message">Message</label>
                                    <textarea type="text" id="message" name="message"></textarea>
                                </div>
                            </div>

                            <div className={cx('submit-btn')}><Button small primary type='submit'>Send</Button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
