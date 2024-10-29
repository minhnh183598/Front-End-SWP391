import Button from '~/components/Button';
import styles from './BlogList.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import IMAGES from '~/assets/images';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function BlogList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [blogData, setBlogData] = useState([]);
    const token = localStorage.getItem('token');

    const getBlogData = async () => {
        try {
            const response = await api.get(`posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Authorization: `No Auth`,
                },
            });
            setBlogData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(blogData);

    useEffect(() => {
        getBlogData();
    }, []);

    const blogPerPage = 9;
    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
    const currentBlog = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <div className={cx('blog-list')}>
            {currentBlog.map((blog) => (
                <div className={cx('blog-box')} key={blog.id}>
                    <div className={cx('image')}>
                        <img src={blog.image} />
                    </div>

                    <div className={cx('blog-info')}>
                        <div className={cx('info')}>
                            <div className={cx('main-info')}>
                                <h3>{blog.title}</h3>
                                <p>{blog.info}</p>
                            </div>
                        </div>

                        <div className={cx('blog-btn')}>
                            <Button
                                to={`/blog-detail/${blog.id}`}
                                mgRight10
                                outline
                                small
                                className={cx('btn')}
                                onClick={() => console.log(blog.id)}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

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
    );
}

export default BlogList;
