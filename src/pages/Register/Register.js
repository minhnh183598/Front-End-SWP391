import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { Form, Input } from 'antd';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const [successMsg, setSuccessMsg] = useState('');
    const [toVerify, setToVerify] = useState(false);

    const handleRegister = async (values) => {
        console.log(values);

        try {
            await api.post(`auth/register`, values, {
                headers: {
                    Authorization: 'No Auth',
                },
            });

            setSuccessMsg('Register successfully!');
            setToVerify(true);

        } catch (error) {
            console.log(error);
            setSuccessMsg('Failed to register');
        }
    };

    const handleVerify = async (values) => {
        console.log(values);

        try {
            const response = await api.post(`auth/verify`, values, {
                headers: {
                    Authorization: 'No Auth',
                },
            })

            console.log(response.data);
            
            setTimeout(() => {
                navigate('/login', { state: { from } });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={cx('login')}>
                <div className={cx('login-img')}>
                    <img src={IMAGES.about} />
                </div>

                <div className={cx('login-form')}>
                    <div className={cx('wrapper')}>
                        <LoginHeader />

                        <Link to="/">
                            <img src={IMAGES.logo} className={cx('logo')} />
                        </Link>

                        {/* <Form className={cx('form')} onFinish={handleRegister}>
                            <Form.Item
                                className={cx('form-item')}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: <span style={{ fontSize: 12 }}>Please enter a username</span>,
                                    },
                                    {
                                        min: 6,
                                        max: 12,
                                        message: <span style={{ fontSize: 12 }}>User is required 6-12 characters</span>,
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="text" placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                className={cx('form-item')}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: <span style={{ fontSize: 12 }}>Please enter a password</span>,
                                    },
                                    {
                                        min: 6,
                                        max: 20,
                                        message: (
                                            <span style={{ fontSize: 12 }}>Password is required 6-20 characters</span>
                                        ),
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="password" placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                className={cx('form-item')}
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: <span style={{ fontSize: 12 }}>Please enter a confirm password</span>,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                <span style={{ fontSize: 12 }}>The new password do not match!</span>,
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input className={cx('input')} type="password" placeholder="Confirm password" />
                            </Form.Item>

                            <Form.Item
                                className={cx('form-item', 'mgbt')}
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: <span>The input is not valid E-mail!</span>,
                                    },
                                    {
                                        required: true,
                                        message: <span style={{ fontSize: 12 }}>Please enter an email</span>,
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="text" placeholder="Email" />
                            </Form.Item>

                            <span className={cx('regis-msg', successMsg === 'Failed to register' ? 'red-text' : null)}>
                                {successMsg}
                            </span>

                            <Button className={cx('submit-btn')} type="submit">
                                Register
                            </Button>
                        </Form> */}

                        <Form className={cx('form-otp')} onFinish={handleVerify}>
                            <p>Check your email to get an OTP</p>
                            <Form.Item
                                className={cx('form-item')}
                                name="OTP"
                                rules={[
                                    {
                                        required: true,
                                        message: <span style={{ fontSize: 12 }}>Please enter an OTP</span>,
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="text" placeholder="OTP"/>
                            </Form.Item>
                            <div className={cx('wrap-btn')}>
                                <Button mgRight10 medium primary className={cx('opt-btn')} type="submit">
                                    Verify
                                </Button>
                                <Button medium outline className={cx('otp-btn')} onClick={() => setToVerify(false)}>
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

{
    /* <div className={cx('login-choice')}>
                            <button
                                className={cx(action === 'Login' ? 'active' : '')}
                                onClick={() => {
                                    setAction('Login');
                                    navigate('/login');
                                }}
                            >
                                Login
                            </button>
                            <button
                                className={cx(action === 'Register' ? 'active' : '')}
                                onClick={() => {
                                    setAction('Register');
                                }}
                            >
                                Register
                            </button>
                        </div> */
}
