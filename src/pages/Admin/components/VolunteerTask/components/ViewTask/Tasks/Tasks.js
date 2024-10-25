import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Tasks.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeCheck from '../HomeCheck/HomeCheck';
import Button from '~/components/Button';
import api from '~/config/axios';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Tasks({ task }) {
    const [checklistState, setChecklistState] = useState([]);

    useEffect(() => {
        const initialChecklistState = task.checklist.checklistItems.map((item) => ({
            id: item.id,
            entry: item.entry,
            completed: item.completed,
        }));
        setChecklistState(initialChecklistState);
    }, [task]);

    const handleCheckboxChange = (id) => {
        setChecklistState((prev) =>
            prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
        );
    };

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
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const handleUpdateCheckList = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await Promise.all(
                checklistState.map(async (checkItem) => {
                    const response = await api.put(
                        `checklists/${task.checklist.id}/entry?entryId=${checkItem.id}&completed=${checkItem.completed}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                    console.log('update checklist', response.data);
                }),
            );
        } catch (error) {
            console.log(error);
        }
    };

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' / ');
        return formattedDate;
    };

    return (
        <div className={cx('task-info')}>
            <div className={cx('task-title')}>
                <p>Task</p>
                <p>Due date: {formatDueDate(task.dueDate)}</p>
            </div>

            <span className={cx('task-status', { 'status-notstart': task.status === 'NOT_STARTED' })}>
                {formatStatus(task.status)}
            </span>

            <h5>
                <b>{task.name}</b>
            </h5>

            <div className={cx('task-content')}>
                <div className={cx('task-checklist-wrap')}>
                    <div className={cx('task-right-info')}>
                        <p style={{ marginBottom: 5 }}>
                            <b>Description</b>
                        </p>
                        <div className={cx('task-des-wrap')}>{task.description}</div>
                    </div>
                    <div className={cx('checklist')}>
                        <p style={{ marginBottom: 5 }}>
                            <b>Checklist</b>
                        </p>
                        <form onSubmit={handleUpdateCheckList}>
                            {checklistState.map((checkItem) => (
                                <div className={cx('checklist-item')} key={checkItem.id}>
                                    <input
                                        type="checkbox"
                                        id={`checkitem-${checkItem.id}`}
                                        checked={checkItem.completed}
                                        onChange={() => handleCheckboxChange(checkItem.id)}
                                    />
                                    <label htmlFor={`checkitem-${checkItem.id}`}>{checkItem.entry}</label>
                                </div>
                            ))}
                            <Button primary small type="submit">
                                Save
                            </Button>
                        </form>
                    </div>
                </div>
                <div className={cx('adopter-info')}>
                    <p style={{ marginBottom: 5 }}>
                        <b>Adopter Information</b>
                    </p>
                    <div className={cx('adopter-detail-wrap')}>
                        <div className={cx('adopter-detail-info-top')}>
                            <div className={cx('adopter-detail-info-top-left')}>
                                <span className={cx('adopter-detail-info')}>
                                    {task.adopter.lastname} {task.adopter.firstname}
                                </span>
                                <span className={cx('adopter-detail-info')}>{task.adopter.email}</span>
                                <span className={cx('adopter-detail-info')}>FPT University, Thu Duc City</span>
                            </div>
                            <div className={cx('adopter-detail-info-top-right')}>
                                <span className={cx('adopter-detail-info')}>25/01/2003</span>
                                <span className={cx('adopter-detail-info')}>0903532335</span>
                                <span className={cx('adopter-detail-info')}>Male</span>
                            </div>
                        </div>
                    </div>
                </div>

                <HomeCheck />
            </div>
        </div>
    );
}

export default Tasks;
