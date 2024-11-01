import Button from '~/components/Button';
import styles from './BlogList.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import api from '~/config/axios';

const cx = classNames.bind(styles);

function BlogList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [blogData, setBlogData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // Trạng thái cho phương thức sắp xếp
    const token = localStorage.getItem('token');
    const blogPerPage = 9;

    const getBlogData = async () => {
        try {
            const response = await api.get(`posts/search?tags=Post&category=ADOPTION`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBlogData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogData();
    }, []);

    // Lọc blogData dựa trên searchTerm
    const filteredBlogData = blogData.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Sắp xếp dữ liệu dựa trên lựa chọn
    const sortedBlogData = [...filteredBlogData].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createAt) - new Date(a.createAt); // Sắp xếp mới nhất
        } else if (sortOrder === 'likes') {
            return b.likeCount - a.likeCount; // Sắp xếp theo lượt thích
        } else if (sortOrder === 'oldest') {
            return new Date(a.createAt) - new Date(b.createAt); // Sắp xếp cũ nhất
        }
        return 0;
    });

    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
    const currentBlog = sortedBlogData.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <div>
            <div className={cx('blog-search')}>
                {/* Tùy chọn sắp xếp */}
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={cx('sort-select')}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="likes">Most Liked</option>
                </select>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Blog" />
            </div>

            <div className={cx('blog-list')}>
                {currentBlog.map((blog) => (
                    <div className={cx('blog-box')} key={blog.id}>
                        <div className={cx('image')}>
                            <img src={blog.images} alt={blog.title} />
                        </div>
                        <div className={cx('blog-info')}>
                            <div className={cx('info')}>
                                <div className={cx('main-info')}>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.info}</p>
                                    <p>{blog.likeCount} likes</p>
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
                        total={sortedBlogData.length} // Cập nhật tổng số lượng blog đã sắp xếp
                        pageSize={blogPerPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default BlogList;
