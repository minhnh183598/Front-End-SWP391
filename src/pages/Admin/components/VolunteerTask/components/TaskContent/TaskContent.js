import styles from './TaskContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TaskContent({ currentTask, setViewTask, setTaskID }) {
    const formatStatus = (status) => {
        return status
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Uppercase chữ cái đầu và lowercase các chữ cái còn lại
            .join(' ');
    };
    return (
        <div className={cx('content')}>
            {currentTask.map((task) => (
                <div className={cx('content-item')} key={task.id}>
                    <p className={cx('id')}>#{task.id}</p>
                    <p className={cx('name')}>{task.name}</p>
                    <div className={cx('state')}>{formatStatus(task.status)}</div>
                    <p className={cx('date')}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</p>
                    <div className={cx('action')}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-icon')}
                            onClick={() => {
                                setTaskID(task.id);
                                setViewTask(true);
                                console.log(task.id);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskContent;