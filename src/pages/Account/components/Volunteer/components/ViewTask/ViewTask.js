import classNames from 'classnames/bind';
import styles from './ViewTask.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import Tasks from './components/Tasks/Tasks';
import Issue from './components/Issue/Issue';
import IssuesDetail from './components/IssuesDetail/IssuesDetail';
import Adopter from './components/Adopter/Adopter';
import AddIssue from '../AddIssue/AddIssue';
import React from 'react';

const cx = classNames.bind(styles);

function ViewTask({ setUndertakeTask, taskID }) {
    const [singleTask, setSingleTask] = useState(null);
    const [issue, setIssue] = useState([]);
    const [openCreateIssue, setOpenCreateIssue] = useState(false);
    const [openIssueDetail, setOpenIssueDetail] = useState(false);
    const [issueStatusDetail, setIssueStatusDetail] = useState('');
    const [tagIssueData, setTagIssueData] = useState([]);

    const handleSingTaskData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`tasks/${taskID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('task data: ', response.data.result);
            setSingleTask(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTagsIssueData = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`tags/type/ISSUE_LABEL`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('tag issue', response.data.result);
            setTagIssueData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskIssue = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`issues/tasks/${taskID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('issue: ', response.data.result);
            setIssue(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUndertakeTask = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`tasks/${taskID}/attend`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('undertake-task: ', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSingTaskData();
        handleTagsIssueData();
        handleTaskIssue();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setUndertakeTask('Tasks')}>
                &larr;Back
            </p>

            <div className={cx('wrapper-bottom')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-info')}>
                        {singleTask ? ( // Kiểm tra xem singleTask có tồn tại
                            <>
                                <Tasks singleTask={singleTask} />

                                {singleTask.adopter !== null ? <Adopter /> : null}

                                {singleTask.issues.length === 0 ? (
                                    <>
                                        <Button primary onClick={() => setOpenCreateIssue(true)}>
                                            Create Issue
                                        </Button>
                                        {openCreateIssue && (
                                            <AddIssue
                                                tagIssueData={tagIssueData}
                                                taskID={taskID}
                                                setOpenCreateIssue={setOpenCreateIssue}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <Issue
                                        setIssueStatusDetail={setIssueStatusDetail}
                                        setOpenIssueDetail={setOpenIssueDetail}
                                        singleTask={singleTask}
                                    />
                                )}

                                <div className={cx('undertake-btn')}>
                                    <Button primary onClick={handleUndertakeTask}>
                                        Undertake
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>Loading task data...</p>
                        )}
                    </div>
                </div>

                {openIssueDetail ? (
                    <div className={cx('container-right')}>
                        <IssuesDetail
                            taskID={taskID}
                            issueStatusDetail={issueStatusDetail}
                            issue={issue}
                            setOpenIssueDetail={setOpenIssueDetail}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ViewTask;
