import classNames from 'classnames/bind';
import styles from './VolunteerTask.module.scss';

const cx = classNames.bind(styles);

function VolunteerTasks() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <ul>
                    <li>All</li>
                    <li>New</li>
                    <li>Not Finish</li>
                    <li>Finished</li>
                </ul>
            </div>

            <div className={cx('sort')}>
                <label htmlFor="sort">Sort</label>
                <select id="sort" name="sort" value=''>
                    <option value="all">All</option>
                    <option value="createDate">Create Date</option>
                    <option value="finishDate">Finish Date</option>
                </select>
            </div>
        </div>
    );
}

export default VolunteerTasks;