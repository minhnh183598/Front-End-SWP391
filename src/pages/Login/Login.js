import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Form, Input } from 'antd';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = async (values) => {
        console.log(values);
        //send request -> server
        const { username, password } = values;

        try {
            const response = await api.get('users', values);
            const users = response.data;

            const userAuth = users.find((userAuth) => userAuth.username === username && userAuth.password === password);

            if (userAuth) {
                localStorage.setItem('user', JSON.stringify(userAuth));
                setSuccessMsg('Login successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setSuccessMsg('Login failed');
            }
        } catch (error) {
            console.log(error);
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

                            <span className={cx('regis-msg')}>{successMsg}</span>

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
