import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };

    return (
        <Tippy
            placement="bottom"
            interactive
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    {renderItems()}
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
