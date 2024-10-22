import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Tasks.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import React from 'react';

const cx = classNames.bind(styles);

function Tasks({ singleTask }) {
    const [viewMemberInTeam, setViewMemberInTeam] = useState(null);

    const openModal = (member) => {
        setViewMemberInTeam(member);
    };

    const closeModal = () => {
        setViewMemberInTeam(null);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const formatDueDate = (dueDate) => {
        const formattedDate = dueDate.slice(0, 16).replace('T', ' ');
        return formattedDate;
    };

    return (
        <div className={cx('task-info')}>
            <div className={cx('task-title')}>
                <p>Task</p>
                <p>Due date: {formatDueDate(singleTask.dueDate)}</p>
            </div>
            <h5>
                <b>{singleTask.name}</b>
            </h5>
            <div className={cx('task-info-wrap')}>
                <div className={cx('task-left-info')}>
                    <p>
                        <b>Owner: </b>
                        {singleTask.owner.lastname} {singleTask.owner.firstname} - {singleTask.owner.username}
                    </p>

                    <div className={cx('task-left-info-team')}>
                        <b>Team: </b>
                        {singleTask.team.map((member) => (
                            <div
                                key={member.id}
                                style={{ display: 'inline-block', marginLeft: 5, cursor: 'pointer' }}
                                onClick={() => openModal(member)}
                            >
                                <FontAwesomeIcon icon={faUser} title={`${member.firstname} ${member.lastname}`} />
                            </div>
                        ))}
                        <span className={cx('plus-icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </div>

                    <p>
                        <b>Category: </b>
                        {singleTask.category}
                    </p>
                    <div style={{ display: 'flex' }}>
                        <p style={{ marginRight: 10, marginBottom: 0 }}>
                            <b>Status:</b>
                        </p>
                        <p className={cx('task-tag')}>
                            {singleTask.status == 'NOT_STARTED' ? 'Not Start' : singleTask.status}
                        </p>
                    </div>
                </div>
                <div className={cx('task-right-info')}>
                    <p style={{ marginBottom: 5 }}>
                        <b>Description: </b>
                    </p>
                    <div className={cx('task-des-wrap')}>{singleTask.description}</div>
                </div>
            </div>

            <div className={cx('task-tags')}>
                {singleTask.tags.map((tag, index) => (
                    <p key={index} style={{ backgroundColor: getRandomColor() }}>
                        {tag}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Tasks;
