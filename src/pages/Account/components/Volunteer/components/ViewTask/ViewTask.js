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
import CreateFeedback from './components/CreateFeedback/CreateFeedback';

const cx = classNames.bind(styles);

function ViewTask({ setUndertakeTask, taskID }) {
    const [singleTask, setSingleTask] = useState(null);
    //const [issue, setIssue] = useState([]);
    const [openCreateIssue, setOpenCreateIssue] = useState(false);
    const [openIssueDetail, setOpenIssueDetail] = useState(false);
    const [issueStatusDetail, setIssueStatusDetail] = useState('');
    const [tagIssueData, setTagIssueData] = useState([]);
    const [isUndertake, setIsUndertakeTask] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);

    const handleSingTaskData = async () => {
        const token = localStorage.getItem('token');

        try {
            const taskData = await api.get(`tasks/${taskID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('task data: ', taskData.data.result);
            setSingleTask(taskData.data.result);

            const tagIssue = await api.get(`tags/type/ISSUE_LABEL`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('tag issue', tagIssue.data.result);
            setTagIssueData(tagIssue.data.result);

            // const taskIssue = await api.get(`issues/tasks/${taskID}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });

            // console.log('issue: ', taskIssue.data.result);
            // setIssue(taskIssue.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleAddUserToIssue = async () => {
    //     const token = localStorage.getItem('token');
    //     const userId = localStorage.getItem('userId');

    //     try {
    //         const response = await api.put(`issues/${issueDetailData.map(is => return is.id)}/task/${taskID}/user?userId=${userId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         console.log('add user to issue: ', response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleUndertakeTask = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.get(`tasks/${taskID}/attend`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('undertake-task: ', response.data);
            setIsUndertakeTask(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateStatusDone = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.put(`tasks/${taskID}/status/DONE`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     if (singleTask.feedbacks !== null) {
    //         handleUpdateStatusDone();
    //     }
    // }, [openFeedback]);

    useEffect(() => {
        //handleAddUserToIssue();
        handleSingTaskData();
    }, [isUndertake, openCreateIssue]);

    const userId = localStorage.getItem('userId');

    return (
        <div className={cx('wrapper')}>
            <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setUndertakeTask('Tasks')}>
                &larr;Back
            </p>

            <div className={cx('wrapper-bottom')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-info')}>
                        {singleTask ? (
                            <>
                                <Tasks singleTask={singleTask} />

                                {singleTask.adopter !== null ? <Adopter /> : null}

                                {!singleTask.team.some((member) => member.id === userId) ? null : singleTask.issues
                                      .length === 0 ? (
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
                                    <>
                                        <Issue
                                            setIssueStatusDetail={setIssueStatusDetail}
                                            setOpenIssueDetail={setOpenIssueDetail}
                                            singleTask={singleTask}
                                        />

                                        <Button primary onClick={() => setOpenFeedback(true)}>
                                            Send Feedback
                                        </Button>
                                        {openFeedback ? (
                                            <CreateFeedback taskID={taskID} setOpenFeedback={setOpenFeedback} />
                                        ) : null}
                                    </>
                                )}

                                {!singleTask.team.some((member) => member.id === userId) ? (
                                    <div className={cx('undertake-btn')}>
                                        <Button primary onClick={handleUndertakeTask}>
                                            Undertake
                                        </Button>
                                    </div>
                                ) : null}
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
                            setOpenIssueDetail={setOpenIssueDetail}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ViewTask;
