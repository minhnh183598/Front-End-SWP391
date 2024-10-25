import { useEffect, useState } from 'react';
import styles from './ViewTask.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import Button from '~/components/Button';
import Update from './Update';
import Issues from './IssuesDetail/IssuesDetail';
import Tasks from './Tasks/Tasks';
import AddIssue from '../AddIssue/AddIssue';
import IssuesDetail from './IssuesDetail/IssuesDetail';
import Adopter from './Adopter/Adopter.js';
import Issue from './Issue/Issue';
import HomeCheck from './HomeCheck/HomeCheck';

const cx = classNames.bind(styles);

function ViewTask({ id, setViewUser, tagIssueData, setAddAll }) {
    const [task, setTask] = useState(null);
    const [issue, setIssue] = useState([]);
    const [update, setUpdate] = useState(false);
    const [formData, setFormData] = useState({});
    const [openCreateIssue, setOpenCreateIssue] = useState(false);
    const [openIssueDetail, setOpenIssueDetail] = useState(false);
    const [issueStatusDetail, setIssueStatusDetail] = useState('');

    const handleTaskData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('task data: ', response.data.result);
            setTask(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskIssue = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`issues/tasks/${id}`, {
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

    useEffect(() => {
        handleTaskData();
        handleTaskIssue();
    }, [openCreateIssue]);

    if (!task) {
        return <div>Loading...</div>;
    }

    const toggleUpdate = () => {
        setUpdate(!update);
        window.scrollTo({
            top: 500,
            behavior: 'smooth',
        });
    };

    const closeUpdate = () => {
        setUpdate(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setViewUser(false)}>
                &larr;Back
            </p>

            <div className={cx('wrapper-bottom')}>
                <div className={cx('container-left')}>
                    <div className={cx('container-info')}>
                        <Tasks task={task} />

                        {/* {task.adopter !== null ? <Adopter /> : null}

                        <HomeCheck/> */}

                        {/* {task.issues.length == 0 ? (
                            <>
                                <Button primary onClick={() => setOpenCreateIssue(true)}>
                                    Create Issue
                                </Button>
                                {openCreateIssue && (
                                    <AddIssue
                                        tagIssueData={tagIssueData}
                                        id={id}
                                        setOpenCreateIssue={setOpenCreateIssue}
                                    />
                                )}
                            </>
                        ) : (
                            <Issue
                                setIssueStatusDetail={setIssueStatusDetail}
                                setOpenIssueDetail={setOpenIssueDetail}
                                task={task}
                            />
                        )} */}
                    </div>
                </div>

                {/* {openIssueDetail ? (
                    <div className={cx('container-right')}>
                        <IssuesDetail
                            id={id}
                            issueStatusDetail={issueStatusDetail}
                            setOpenIssueDetail={setOpenIssueDetail}
                        />
                    </div>
                ) : null} */}
            </div>

            {update && (
                <Update
                    setUpdate={setUpdate}
                    formData={formData}
                    setFormData={setFormData}
                    closeUpdate={closeUpdate}
                    handleTaskData={handleTaskData}
                    id={id}
                />
            )}
        </div>
    );
}

export default ViewTask;
