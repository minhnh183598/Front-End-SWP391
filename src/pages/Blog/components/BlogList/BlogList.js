import Button from '~/components/Button';
import styles from './BlogList.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Pagination } from 'antd';
import IMAGES from '~/assets/images';

const cx = classNames.bind(styles);

function BlogList() {
    const [currentPage, setCurrentPage] = useState(1);

    const blogData = [
        {
            id: 1,
            image: IMAGES.blog1,
            title: '1 Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 2,
            image: IMAGES.blog2,
            title: '2 Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 3,
            image: IMAGES.blog3,
            title: '3 Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 4,
            image: IMAGES.blog1,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 5,
            image: IMAGES.blog2,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 6,
            image: IMAGES.blog3,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 7,
            image: IMAGES.blog1,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 8,
            image: IMAGES.blog2,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 9,
            image: IMAGES.blog3,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 10,
            image: IMAGES.blog1,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
        {
            id: 11,
            image: IMAGES.blog2,
            title: 'Top 10 Best and Worst Foods for Pets',
            info: 'Dogs are known to be our loyal companions, and as pet owners, it is our responsibility to take care of them. One way to do this is to make sure we avoid feeding them foods that can be toxic to their health. Unfortunately, some of the foods we humans love can cause severe harm to our furry friends.',
        },
    ];

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
                            <Button to='/blog-detail' mgRight10 outline small className={cx('btn')} onClick={() => console.log(blog.id)}>
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
