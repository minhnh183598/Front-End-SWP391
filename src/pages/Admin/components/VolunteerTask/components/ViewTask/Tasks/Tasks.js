import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Tasks.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Tasks({ task }) {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const formatStatus = (status) => {
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Uppercase chữ cái đầu và lowercase các chữ cái còn lại
            .join(' ');
    };

    return (
        <div className={cx('task-info')}>
            <div className={cx('task-title')}>
                <p>Task</p>
                <p>Due date: {task.dueDate}</p>
            </div>
            <h5>
                <b>{task.name}</b>
            </h5>
            <div className={cx('task-info-wrap')}>
                <div className={cx('task-left-info')}>
                    <p>
                        <b>Owner: </b>
                        {task.owner.lastname} {task.owner.firstname} - {task.owner.username}
                    </p>

                    <p className={cx('task-left-info-team')}>
                        <b>Team: </b>
                        {Array.from({ length: task.team.length }, (_, index) => (
                            <FontAwesomeIcon style={{ marginLeft: 5 }} key={index} icon={faUser} />
                        ))}
                        <span className={cx('plus-icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </p>
                    <p>
                        <b>Category: </b>
                        {task.category}
                    </p>
                    <div style={{ display: 'flex' }}>
                        <p style={{ marginRight: 10, marginBottom: 0 }}>
                            <b>Status:</b>
                        </p>
                        <p className={cx('task-tag')}>{formatStatus(task.status == 'NOT_STARTED' ? 'Not Start' : task.status)}</p>
                    </div>
                </div>
                <div className={cx('task-right-info')}>
                    <p style={{ marginBottom: 5 }}>
                        <b>Description: </b>
                    </p>
                    <div className={cx('task-des-wrap')}>{task.description}</div>
                </div>
            </div>

            <div className={cx('task-tags')}>
                {task.tags.map((tag, index) => (
                    <p key={index} style={{ backgroundColor: getRandomColor() }}>
                        {tag}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Tasks;
