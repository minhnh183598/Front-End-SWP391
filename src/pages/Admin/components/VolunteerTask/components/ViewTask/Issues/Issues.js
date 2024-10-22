import { useEffect } from 'react';
import styles from './Issues.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Issues({ issue }) {
    const doneIssue = issue.filter((i) => i.status === 'DONE');
    const processIssue = issue.filter((i) => i.status === 'IN_PROGRESS');
    const notIssue = issue.filter((i) => i.status === 'NOT_STARTED');
    return (
        <div className={cx('issue-info')}>
            <p className={cx('issue-title')}>
                <b>Issues</b>
            </p>
            <div className={cx('issue-state-list')}>
                <div className={cx('issue-state-box-notstart')} style={{ backgroundColor: 'lightgrey' }}>
                    <p className={cx('issue-state-heading')}>Not Started</p>
                    <div className={cx('issue-state-info')}>
                        {notIssue.length > 0 ? (
                            notIssue.map((i) => (
                                <div key={i.id}>
                                    <p>
                                        <b>Due date:</b> {i.dueDate}
                                    </p>
                                    <p>
                                        <b>Priority:</b> {i.priority}
                                    </p>
                                    <p>
                                        <b>Description:</b> {i.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>No issue available.</p>
                        )}
                    </div>

                    {notIssue.length > 0 ? (
                        <div className={cx('issue-state-more')}>
                            <p>More &gt;</p>
                        </div>
                    ) : null}
                </div>

                <div className={cx('issue-state-box-process')} style={{ backgroundColor: 'rgb(228, 228, 61)' }}>
                    <p className={cx('issue-state-heading')}>In Process</p>
                    <div className={cx('issue-state-info')}>
                        {processIssue.length > 0 ? (
                            processIssue.map((i) => (
                                <div key={i.id}>
                                    <p>
                                        <b>Due date:</b> {i.dueDate}
                                    </p>
                                    <p>
                                        <b>Priority:</b> {i.priority}
                                    </p>
                                    <p>
                                        <b>Description:</b> {i.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>No issue available.</p>
                        )}
                    </div>

                    {processIssue.length > 0 ? (
                        <div className={cx('issue-state-more')}>
                            <p>More &gt;</p>
                        </div>
                    ) : null}
                </div>

                <div className={cx('issue-state-box-done')} style={{ backgroundColor: 'green' }}>
                    <p className={cx('issue-state-heading')}>Done</p>
                    <div className={cx('issue-state-info')}>
                        {doneIssue.length > 0 ? (
                            doneIssue.map((i) => (
                                <div key={i.id}>
                                    <p>
                                        <b>Due date:</b> {i.dueDate}
                                    </p>
                                    <p>
                                        <b>Priority:</b> {i.priority}
                                    </p>
                                    <p>
                                        <b>Description:</b> {i.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>No issue available.</p>
                        )}
                    </div>

                    {doneIssue.length > 0 ? (
                        <div className={cx('issue-state-more')}>
                            <p>More &gt;</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Issues;
