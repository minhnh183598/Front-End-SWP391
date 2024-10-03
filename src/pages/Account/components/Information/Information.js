import IMAGES from '~/assets/images';
import styles from './Information.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Information() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('header')}>
                    <h1>Account Information</h1>
                </div>
                <form className={cx('form')}>
                    <div className={cx('form-item')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value=''/>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" name="fname" value=''/>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" name="lname" value=''/>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value=''/>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="phone">Phone</label>
                        <input type="phone" id="phone" name="phone" value=''/>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value=''>
                            <option value="other">Other</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" value='' />
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value='' />
                        <p className={cx('change-info')}>Change</p>
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="city">City</label>
                        <select id="city" name="city" value=''>
                            <option value="other">Other</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <p className={cx('change-info')}>Change</p>
                    </div>
                </form>
            </div>

            <div className={cx('image')}>
                <img src={IMAGES.usetPet}/>
            </div>
        </div>
    );
}

export default Information;
