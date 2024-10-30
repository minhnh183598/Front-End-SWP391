import Button from '~/components/Button';
import styles from './Blogs.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import { convertToRaw, EditorState } from 'draft-js';
import api from '~/config/axios';
import CreateBlog from './BlogComponents/CreateBlog';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Blogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [addBlog, setAddBlog] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalBlog, setTotalBlog] = useState(0);
    const navigate = useNavigate();

    //Lay blog data payment/all
    const handleBlogData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.get(`posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Authorization: `No Auth`,
                },
            });
            setTotalBlog(response.data.result.length);
            setBlogData(response.data.result);
            // localStorage.setItem('bloguData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };

    useEffect(() => {
        handleBlogData();
    }, []);
    console.log('Day la blog data: ', blogData);

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleSubmit = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = JSON.stringify(convertToRaw(contentState));
        console.log(rawContentState);
    };

    const blogPerPage = 12;
    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
    // const currentBlog = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
    const currentBlog = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

    const goToBlogDetail = (id) => {
        navigate(`/blog-detail/${id}`);
    };

    return (
        <>
            {!addBlog ? (
                <div className={cx('wrapper')}>
                    <h1>Blogs</h1>
                    <div className={cx('user-sum')}>
                        <div className={cx('user-sum-item')}>
                            <div>
                                <p className={cx('item-number')}>{totalBlog}</p>
                                <p className={cx('item-label')}>Total Blogs</p>
                            </div>
                            <span>+2.15%</span>
                        </div>
                        {/* <div className={cx('user-sum-item')}>
                            <div>
                                <p className={cx('item-number')}>10</p>
                                <p className={cx('item-label')}>New Blogs</p>
                            </div>
                            <span>-3.5%</span>
                        </div> */}
                    </div>

                    <div className={cx('user-content')}>
                        <div className={cx('header')}>
                            <div className={cx('add-pet')}>
                                <Button primary onClick={() => setAddBlog(true)}>
                                    Create Blog
                                </Button>
                            </div>

                            <div className={cx('search')}>
                                <form>
                                    <label htmlFor="sort">Sort by</label>
                                    <select id="sort" name="sort">
                                        <option value="all">All</option>
                                        <option value="sortByID">ID</option>
                                        <option value="sortByDate">Create Date</option>
                                    </select>

                                    <input type="text" placeholder="Search by name" />
                                    <Button primary small type="submit">
                                        Search
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className={cx('main-content')}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('header-content')}>
                                    <p className={cx('id')}>ID</p>
                                    <p className={cx('title')}>Title</p>
                                    <p className={cx('appli')}>Number of views</p>
                                    <p className={cx('date')}>Create Date</p>
                                    <p className={cx('action')}>Action</p>
                                </div>
                                <div className={cx('content')}>
                                    {currentBlog.map((blog) => (
                                        <div className={cx('content-item')} key={blog.id}>
                                            <p className={cx('id')}>#{blog.id}</p>
                                            <div className={cx('title')}>
                                                <p className={cx('blogtitle')}>{blog.title}</p>
                                                <p className={cx('blogCD')}>{blog.createAt}</p>
                                            </div>
                                            <p className={cx('appli')}>{blog.noa}</p>
                                            <p className={cx('date')}>{blog.enrolled}</p>
                                            <div className={cx('action')}>
                                                <FontAwesomeIcon
                                                    onClick={() => goToBlogDetail(blog.id)}
                                                    icon={faEye}
                                                    className={cx('view-icon')}
                                                />
                                                <FontAwesomeIcon icon={faTrash} className={cx('delete-icon')} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('pagination')}>
                                <Pagination
                                    style={{ display: 'block' }}
                                    current={currentPage}
                                    defaultCurrent={1}
                                    total={blogData.length}
                                    pageSize={blogPerPage}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('create-blog')}>
                    <h1>Create Blog</h1>
                    <div className={cx('form-wrapper')}>
                        <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setAddBlog(false)}>
                            &larr;Back
                        </p>
                        <CreateBlog />
                    </div>
                    <Button primary onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            )}
        </>
    );
}

export default Blogs;
