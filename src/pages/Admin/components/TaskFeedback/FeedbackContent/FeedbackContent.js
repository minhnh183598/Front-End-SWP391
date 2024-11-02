import styles from './FeedbackContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FeedbackContent({ currentFeedback, setTaskID, setViewTask }) {
    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };
    return (
        <div className={cx('content')}>
            {currentFeedback.map((feedback) => (
                <div className={cx('content-item')} key={feedback.id}>
                    <p className={cx('id')}>#{feedback.id}</p>
                    <p className={cx('reporter')}>
                        {feedback.reporter.username} 
                    </p>
                    <p className={cx('rating')}>{feedback.rating.averageRating}</p>
                    <p className={cx('petName')}>{feedback.petName}</p>
                    <p className={cx('date')}>{formatDueDate(feedback.createdAt)}</p>
                    <div className={cx('action')}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-icon')}
                            onClick={() => {
                                setTaskID(feedback.taskId);
                                setViewTask(true);
                                console.log(feedback.taskId);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeedbackContent;
