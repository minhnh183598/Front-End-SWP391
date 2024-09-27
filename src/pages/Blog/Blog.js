import IMAGES from '~/assets/images';
import styles from './Blog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Blog() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.blog} alt="banner" />
            </div>
        </div>
    );
}

export default Blog;
