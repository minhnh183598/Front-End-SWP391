import Button from '~/components/Button';
import styles from './BlogList.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Pagination } from 'antd';
import IMAGES from '~/assets/images';

const cx = classNames.bind(styles);

function BlogList({data, dataLength}) {
    const [currentPage, setCurrentPage] = useState(1);

    const blogPerPage = 9;
    const indexOfLastBlog = currentPage * blogPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogPerPage; 
    const currentBlog = data.slice(indexOfFirstBlog, indexOfLastBlog);
    
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
                            <Button mgRight10 outline small className={cx('btn')} onClick={() => console.log(blog.id)}>
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
                    total={dataLength}
                    pageSize={blogPerPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default BlogList;
