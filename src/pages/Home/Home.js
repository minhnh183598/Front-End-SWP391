import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import { Row, Col, Container } from 'react-bootstrap';
import RegisBanner from '~/components/Layout/components/RegisterBanner';
import ICONS from '~/assets/icons';
import Events from './HomeComponents/Events';
import FeaturePet from '../FindPet/components/FeaturePet';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.banner} alt="banner" />

                <h1>Connecting People & Pets</h1>
            </div>

            {/*About Us Content */}
            <div className={cx('about')}>
                <div className={cx('about-content')}>
                    <div className={cx('text')}>
                        <h2 className={cx('heading')}>Who We Are?</h2>
                        <p className={cx('about-para')}>
                            Since 2020, we've been devoted to rescuing stray, neglected, abandoned and surrendered pets
                            in need.
                        </p>
                        <Button outline large to="/about-us" className={cx('btn')}>
                            Learn More
                        </Button>
                    </div>
                    <img src={IMAGES.aboutUs} alt="about" />
                </div>
            </div>

            {/*Feature Pet Content */}
            <FeaturePet homepage={true}>
                <Button primary xlarge to="/find-a-pet" className={cx('link-btn')}>
                    View All Adoptable Pets
                </Button>
            </FeaturePet>

            <RegisBanner />

            {/*Events */}
            <Events />

            {/*Contact */}
            <div className={cx('contact')}>
                <h1 className={cx('main-heading')}>Contact Us</h1>
                <p className={cx('main-slogan')}>Let us assist you - contact us today!</p>

                <Row className={cx('content')}>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.phoneWhi} />
                            </div>
                            <h2>Phone</h2>
                            <p>
                                028.123.4567 <br /> 028.321.0123
                            </p>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.mailWhi} />
                            </div>
                            <h2>Mail</h2>
                            <p>furryfriendshaven@gmail.com</p>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.locateWhi} />
                            </div>
                            <h2>Address</h2>
                            <p>
                                FPT University, Thu Duc District, <br />
                                Ho Chi Minh City
                            </p>
                        </div>
                    </Col>
                    <Col lg={3} className={cx('contact-box')}>
                        <div className={cx('box')}>
                            <div className={cx('icon')}>
                                <img src={ICONS.clockWhi} />
                            </div>
                            <h2>Open Hours</h2>
                            <p>
                                Mon - Fri: 7am - 7pm
                                <br />
                                Sat - Sun: 7am - 4pm
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
