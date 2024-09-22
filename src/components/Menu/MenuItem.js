import Button from "~/components/Button";
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const handleClick = () => {
        if (data.action) {
            data.action(); 
        }
    };

    return <Button className={cx('item')} to={data.to} onClick={handleClick}>{data.label}</Button>;
}

export default MenuItem;
