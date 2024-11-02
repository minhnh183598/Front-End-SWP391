import Button from '~/components/Button';
import styles from './TaskFeedback.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import Search from './Search/Search';
import FeedbackContent from './FeedbackContent/FeedbackContent';
import ViewTask from './ViewTask/ViewTask';


const cx = classNames.bind(styles);

function TaskFeedback() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [dataLength, setDataLength] = useState(0);
    const [feedbackData, setFeedbackData] = useState([]);
    const [viewTask, setViewTask] = useState(false);
    const [taskID, setTaskID] = useState('');
    const [filter, setFilter] = useState({
        sortDir: 'DESC',
        sortBy: '',
        petName: '',
    });

    const handleFeedbackData = async () => {
        const token = localStorage.getItem('token');
        const query = `sortBy=${filter.sortBy}&sortDir=${filter.sortDir}&petName=${searchName}`;

        try {
            const response = await api.get(`feedbacks/search?${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('feedback list', response.data.result);
            setFeedbackData(response.data.result);
            console.log('feedback search result', response.data.result);
            setDataLength(response.data.result.length);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const newSort = value == '' ? 'DESC' : value == 'Rating' ? 'DESC' : filter.sortBy;

        setFilter((prev) => ({
            ...prev,
            [name]: value,
            sortBy: newSort,
        }));
    };

    const handleFinish = async (e) => {
        if (e) e.preventDefault();
        await handleFeedbackData();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };

    useEffect(() => {
        handleFeedbackData();
    }, []);

    const feedbackPerPage = 12;
    const indexOfLastUser = currentPage * feedbackPerPage;
    const indexOfFirstUser = indexOfLastUser - feedbackPerPage;
    const currentFeedback = feedbackData.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className={cx('wrapper')}>
            <h1>Tasks Feedback</h1>

            {!viewTask ? (
                <>
                    <div className={cx('user-sum')}>
                        <div className={cx('user-sum-item')}>
                            <div>
                                <p className={cx('item-number')}>231</p>
                                <p className={cx('item-label')}>Total Blogs</p>
                            </div>
                            <span>+2.15%</span>
                        </div>
                        <div className={cx('user-sum-item')}>
                            <div>
                                <p className={cx('item-number')}>10</p>
                                <p className={cx('item-label')}>New Blogs</p>
                            </div>
                            <span>-3.5%</span>
                        </div>
                    </div>

                    <div className={cx('user-content')}>
                        <div className={cx('header')}>
                            <div className={cx('sort')}>
                                <p>View All</p>
                            </div>

                            <Search
                                filter={filter}
                                handleFilterChange={handleFilterChange}
                                searchName={searchName}
                                setSearchName={setSearchName}
                                handleFinish={handleFinish}
                            />
                        </div>

                        <div className={cx('main-content')}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('header-content')}>
                                    <p className={cx('id')}>ID</p>
                                    <p className={cx('reporter')}>Reporter</p>
                                    <p className={cx('rating')}>Rating</p>
                                    <p className={cx('petName')}>Pet's Name</p>
                                    <p className={cx('date')}>Create Date</p>
                                    <p className={cx('action')}>Action</p>
                                </div>

                                {feedbackData.length === 0 ? (
                                    <p style={{ textAlign: 'center', marginTop: 16 }}>No feedbacks found</p>
                                ) : (
                                    <FeedbackContent
                                        setViewTask={setViewTask}
                                        setTaskID={setTaskID}
                                        currentFeedback={currentFeedback}
                                    />
                                )}
                            </div>
                            <div className={cx('pagination')}>
                                <Pagination
                                    style={{ display: 'block' }}
                                    current={currentPage}
                                    defaultCurrent={1}
                                    total={dataLength}
                                    pageSize={feedbackPerPage}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <ViewTask setViewTask={setViewTask} taskID={taskID} />
            )}
        </div>
    );
}

export default TaskFeedback;
