import IMAGES from '~/assets/images';
import styles from './Blog.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ShortFilter from './components/ShortFilter';
import BlogList from './components/BlogList';

const cx = classNames.bind(styles);

function Blog() {
    const [searchName, setSearchName] = useState('');
    const [filter, setFilter] = useState({
        sort: 'all',
    });

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilter((pre) => ({ ...pre, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value.trim());
    };
    const handleFinish = async (e) => {
        if (e) e.preventDefault();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.blog} alt="banner" />
            </div>

            <div className={cx('content')}>
                <h1>Blogs</h1>

                <div className={cx('short-filter')}>
                    <ShortFilter
                        filter={filter}
                        handleFinish={handleFinish}
                        handleFilterChange={handleFilterChange}
                        searchName={searchName}
                        handleSearchChange={handleSearchChange}
                    />
                </div>
                <div className={cx('blog-content')}>
                    <BlogList data={blogData} dataLength={blogData.length}/>
                </div>
            </div>
        </div>
    );
}

export default Blog;
