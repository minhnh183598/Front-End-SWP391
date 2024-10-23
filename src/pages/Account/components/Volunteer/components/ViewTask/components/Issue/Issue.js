import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Issue.module.scss';
import classNames from 'classnames/bind';
import React from 'react';

const cx = classNames.bind(styles);

function Issue({ setOpenIssueDetail, singleTask, setIssueStatusDetail }) {
    console.log(singleTask.issues);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>
                <b>Issues</b>
            </p>

            <div className={cx('container')}>
                {/* Not Started Box */}
                <div className={cx('issue-box', 'notstart')}>
                    <p className={cx('issue-box-state')}>
                        <b>Not Started</b>
                    </p>
                    {singleTask.issues.filter((issue) => issue.status === 'NOT_STARTED').length > 0 ? (
                        singleTask.issues
                            .filter((issue) => issue.status === 'NOT_STARTED')
                            .map((issue) => (
                                <>
                                    <div key={issue.id} className={cx('issue-box-info')}>
                                        <p>Due Date: {issue.dueDate}</p>
                                        <p>Title: {issue.title}</p>
                                        {/* <p>Priority: {issue.priority}</p> */}
                                    </div>
                                    <div className={cx('more')}>
                                        <p
                                            onClick={() => {
                                                setOpenIssueDetail(true);
                                                setIssueStatusDetail('NOT_STARTED');
                                            }}
                                        >
                                            More &gt;
                                        </p>
                                    </div>
                                </>
                            ))
                    ) : (
                        <p>No issues</p>
                    )}
                </div>

                {/* In Process Box */}
                <div className={cx('issue-box', 'inprocess')}>
                    <p className={cx('issue-box-state')}>
                        <b>In Process</b>
                    </p>
                    {singleTask.issues.filter((issue) => issue.status === 'IN_PROGRESS').length > 0 ? (
                        singleTask.issues
                            .filter((issue) => issue.status === 'IN_PROGRESS')
                            .map((issue) => (
                                <>
                                    <div key={issue.id} className={cx('issue-box-info')}>
                                        <p>Due Date: {issue.dueDate}</p>
                                        <p>Title: {issue.title}</p>
                                        <p>Priority: {issue.priority}</p>
                                    </div>
                                    <div className={cx('more')}>
                                        <p
                                            onClick={() => {
                                                setOpenIssueDetail(true);
                                                setIssueStatusDetail('IN_PROGRESS');
                                            }}
                                        >
                                            More &gt;
                                        </p>
                                    </div>
                                </>
                            ))
                    ) : (
                        <p>No issues</p>
                    )}
                </div>

                {/* Done Box */}
                <div className={cx('issue-box', 'done')}>
                    <p className={cx('issue-box-state')}>
                        <b>Done</b>
                    </p>
                    {singleTask.issues.filter((issue) => issue.status === 'DONE').length > 0 ? (
                        singleTask.issues
                            .filter((issue) => issue.status === 'DONE')
                            .map((issue) => (
                                <>
                                    <div key={issue.id} className={cx('issue-box-info')}>
                                        <p>Due Date: {issue.dueDate}</p>
                                        <p>Title: {issue.title}</p>
                                        <p>Priority: {issue.priority}</p>
                                    </div>
                                    <div className={cx('more')}>
                                        <p
                                            onClick={() => {
                                                setOpenIssueDetail(true);
                                                setIssueStatusDetail('DONE');
                                            }}
                                        >
                                            More &gt;
                                        </p>
                                    </div>
                                </>
                            ))
                    ) : (
                        <p>No issues</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Issue;
