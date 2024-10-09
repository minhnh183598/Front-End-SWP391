import { useState } from 'react';
import styles from './CreateBlog.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CreateBlog({ setOpenPopup }) {
    const [value, setValue] = useState('');
    const modules = []

    return (
        <div className={cx('popup-create-blog')}>
            <h1>Create Your Blog</h1>
            <p onClick={() => setOpenPopup(false)} className={cx('close-popup')}>
                &times;
            </p>

            <div className={cx('popup-wrapper')}>

            </div>
        </div>
    );
}

export default CreateBlog;
