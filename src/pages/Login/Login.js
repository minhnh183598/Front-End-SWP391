import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Checkbox, Form, Input } from 'antd';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import api from '~/config/axios';
import { Color } from 'antd/es/color-picker';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = async (values) => {
        console.log(values);
        try {
            // login
            const response = await api.post(`auth/login`, values, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log(response.data);
            const token = response.data.result.token;
            localStorage.setItem('token', token);

            // take info by token
            const userInfo = await api.get('users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem('userInfo', JSON.stringify(userInfo.data.result));
            const userRoles = userInfo.data.result.roles.map((role) => role.name);
            localStorage.setItem('userRoles', JSON.stringify(userRoles));

            setSuccessMsg('Login successfully!');
            setTimeout(() => {
                navigate(from);
            }, 2000);
        } catch (error) {
            console.log(error);
            setSuccessMsg('Login failed');
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
                        <LoginHeader />

                        <Link to="/">
                            <img src={IMAGES.logo} className={cx('logo')} />
                        </Link>

                        <Form className={cx('form')} onFinish={handleLogin}>
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
                                        message: (
                                            <span style={{ fontSize: 12 }}>Username is required 6-12 characters</span>
                                        ),
                                    },
                                ]}
                            >
                                <Input className={cx('input')} type="text" placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                className={cx('form-item', 'mgbt')}
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

                            <span className={cx('regis-msg', successMsg === 'Login successfully!' ? null : 'red-text')}>
                                {successMsg}
                            </span>

                            <Button className={cx('submit-btn')} type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

// try {
//     const response = await api.post('users', values);
//     console.log(response.data.token);
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(response.data));
//     console.log(localStorage.getItem('user'));
//     setSuccessMsg('Login successfully!');
//     setTimeout(() => {
//         navigate('/');
//     }, 2000);
// } catch (error) {
//     console.log(error);
//     setSuccessMsg('Login failed');
// }

// const { username, password } = values;

// try {
//     const response = await api.get('users', values);
//     const users = response.data;

//     const userAuth = users.find((userAuth) => userAuth.username === username && userAuth.password === password);

//     if (userAuth) {
//         localStorage.setItem('user', JSON.stringify(userAuth));
//         setSuccessMsg('Login successfully!');
//         setTimeout(() => {
//             navigate('/');
//         }, 2000);
//     } else {
//         setSuccessMsg('Login failed');
//     }
// } catch (error) {
//     console.log(error);
// }
