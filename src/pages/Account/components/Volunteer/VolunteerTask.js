import classNames from 'classnames/bind';
import styles from './VolunteerTask.module.scss';
import { useState } from 'react';
import TaskList from './components/TaskList/TaskList';
import ViewTask from './components/ViewTask/ViewTask';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function VolunteerTasks() {
    const [undertakeTask, setUndertakeTask] = useState('Tasks');
    const renderTaskComponent = () => {
        switch (undertakeTask) {
            case 'Tasks':
                return <TaskList setUndertakeTask={setUndertakeTask} />;
            case 'ViewTask':
                return <ViewTask setUndertakeTask={setUndertakeTask} />;
            default:
                return null;
        }
    };

    return (
        <>
            <ToastContainer autoClose={1000} />
            <div className={cx('wrapper')}>{renderTaskComponent()}</div>
        </>
    );
}

export default VolunteerTasks;
