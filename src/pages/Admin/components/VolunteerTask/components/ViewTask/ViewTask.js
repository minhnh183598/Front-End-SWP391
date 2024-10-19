import { useEffect, useState } from 'react';
import styles from './ViewTask.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import Button from '~/components/Button';
import Update from './Update';
import Issues from './Issues/Issues';
import Tasks from './Tasks/Tasks';
import AddIssue from '../AddIssue/AddIssue';

const cx = classNames.bind(styles);

function ViewTask({ id, setViewUser, tagIssueData, setAddAll }) {
    const [task, setTask] = useState(null);
    const [issue, setIssue] = useState([]);
    const [update, setUpdate] = useState(false);
    const [formData, setFormData] = useState({});
    const [openCreateIssue, setOpenCreateIssue] = useState(false);

    const handleTaskData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.result);
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
    }, []);

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

                        {task.issue == null ? (
                            <>
                                <Button primary onClick={() => setOpenCreateIssue(true)}>
                                    Create Issue
                                </Button>
                                {openCreateIssue && (
                                    <AddIssue
                                        tagIssueData={tagIssueData}
                                        setAddAll={setAddAll}
                                        id={id}
                                        setOpenCreateIssue={setOpenCreateIssue}
                                    />
                                )}
                            </>
                        ) : (
                            <Issues issue={issue} />
                        )}
                    </div>
                </div>

                <div className={cx('container-right')}>
                    <h5>Issue Comment</h5>
                </div>
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
