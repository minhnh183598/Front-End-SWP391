
import styles from './FeedbackContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FeedbackContent({currentFeedback}) {
    
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
                        {feedback.reporter.lastname} {feedback.reporter.firstname}
                    </p>
                    <p className={cx('rating')}>{feedback.rating.averageRating}</p>
                    <p className={cx('petName')}>{feedback.petName}</p>
                    <p className={cx('date')}>{formatDueDate(feedback.createdAt)}</p>
                    <div className={cx('action')}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className={cx('view-icon')}
                            // onClick={() => {
                            //     setUserID(user.id);
                            //     setViewUser(true);
                            //     console.log(user.id);
                            // }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeedbackContent;
