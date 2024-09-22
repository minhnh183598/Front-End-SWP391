import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { Form, Input } from 'antd';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import api from '~/config/axios';


const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState('');

    const handleRegister = async (values) => {
        console.log(values);

        // send request -> server
        try {
            const response = await api.post('users', values);
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.data));
            setSuccessMsg('Register successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.log(error);
            setSuccessMsg('Failed to register');
        }
    };

    return (
        <>
            <div className={cx('login')}>
                <div className={cx('login-img')}>
                    <img src={IMAGES.about} />
                </div>

                <div className={cx('login-form')}>
                    <div className={cx('wrapper')}>
                    <LoginHeader/>

                        <Link to="/">
                            <img src={IMAGES.logo} className={cx('logo')} />
                        </Link>

                        <Form className={cx('form')} onFinish={handleRegister}>
                            <Form.Item
                                className={cx('form-item')}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a username',
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
                                        message: 'Please enter a password',
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="password" placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                className={cx('form-item')}
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a confirm password',
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="password" placeholder="Confirm password" />
                            </Form.Item>

                            <Form.Item
                                className={cx('form-item')}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a email',
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="text" placeholder="Email" />
                            </Form.Item>

                            <span className={cx('regis-msg')}>{successMsg}</span>

                            <Button className={cx('submit-btn')} type="submit">
                                Register
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

{/* <div className={cx('login-choice')}>
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
                        </div> */}
