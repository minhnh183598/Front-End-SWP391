import styles from './Adopter.module.scss';
import classNames from 'classnames/bind';
import React from 'react';

const cx = classNames.bind(styles);

function Adopter() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>
                <b>Adopter</b>
            </p>

            <h5></h5>
        </div>
    );
}

export default Adopter;
