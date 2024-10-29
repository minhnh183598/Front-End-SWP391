import IMAGES from '~/assets/images';
import styles from './BlogDetail.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import { useParams } from 'react-router-dom';
import BlogComment from '../Blog/components/BlogComment/BlogComment';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import BlogLike from '../Blog/components/BlogComment/BlogLike/BlogLike';

const cx = classNames.bind(styles);

function BlogDetail() {
    const [index, setIndex] = useState(0);
    const [blogData, setBlogData] = useState();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const id = useParams();
    const useId = id.id;

    const getBlogData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`posts/${useId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBlogData(response.data.result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };
    console.log(blogData);

    useEffect(() => {
        getBlogData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : blogData ? (
                <>
                    <ScrollToTop />
                    <div>
                        <div className={cx('content')}>
                            <h1>{blogData.title}</h1>
                            {/* <div className={cx('content-img')}>
                                <img src={IMAGES.blog1} />
                            </div> */}
                            <div
                                className={cx('main-content')}
                                dangerouslySetInnerHTML={{ __html: blogData.content }}
                            />
                            {/* Render HTML content */}
                            <BlogLike postId={useId} />
                            <BlogComment postId={useId} />
                        </div>
                    </div>
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
}

export default BlogDetail;
