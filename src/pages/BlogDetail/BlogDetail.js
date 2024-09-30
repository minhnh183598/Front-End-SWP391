import IMAGES from '~/assets/images';
import styles from './BlogDetail.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function BlogDetail() {
    const [index, setIndex] = useState(0);
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
    ];

    const blogToShow =
        blogData.length > 0
            ? [blogData[index], blogData[(index + 1) % blogData.length], blogData[(index + 2) % blogData.length]]
            : [];

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [blogData.length]);

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % blogData.length);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + blogData.length) % blogData.length);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Top 10 Best and Worst Foods for Pets</h1>
                <div className={cx('content-img')}>
                    <img src={IMAGES.blog1} />
                </div>

                <div className={cx('main-content')}>
                    <p>
                        With the holiday season comes parties, family gatherings and plenty of opportunities to indulge
                        in delicious holiday fare. And since it is the season of giving, it’s hard not to be tempted to
                        share your leftovers with your cat or dog. Although your pet doesn’t need the extra calories,
                        there are some human foods that are safe to give your animal in moderation and some that you
                        should never feed him. Before you prepare your next holiday feast, check out the photo gallery
                        below to make better food choices for your pet. And make sure you talk to your veterinarian
                        before introducing a new food into your pet’s diet.
                    </p>
                    <div className={cx('main-content-img')}>
                        <img src={IMAGES.blog3} />
                    </div>
                    <p>
                        With the holiday season comes parties, family gatherings and plenty of opportunities to indulge
                        in delicious holiday fare. And since it is the season of giving, it’s hard not to be tempted to
                        share your leftovers with your cat or dog. Although your pet doesn’t need the extra calories,
                        there are some human foods that are safe to give your animal in moderation and some that you
                        should never feed him. Before you prepare your next holiday feast, check out the photo gallery
                        below to make better food choices for your pet. And make sure you talk to your veterinarian
                        before introducing a new food into your pet’s diet.
                    </p>
                    <div className={cx('main-content-img')}>
                        <img src={IMAGES.blog3} />
                    </div>
                    <p>
                        With the holiday season comes parties, family gatherings and plenty of opportunities to indulge
                        in delicious holiday fare. And since it is the season of giving, it’s hard not to be tempted to
                        share your leftovers with your cat or dog. Although your pet doesn’t need the extra calories,
                        there are some human foods that are safe to give your animal in moderation and some that you
                        should never feed him. Before you prepare your next holiday feast, check out the photo gallery
                        below to make better food choices for your pet. And make sure you talk to your veterinarian
                        before introducing a new food into your pet’s diet.
                    </p>
                </div>
            </div>

            <div className={cx('other-blog')}>
                <h2>Other Blogs</h2>
                <button onClick={preSlide} className={cx('pre-btn')}>
                    &lt;
                </button>
                <div className={cx('blog-list')}>
                    {blogToShow.map((blog) => (
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
                </div>
                <button onClick={nextSlide} className={cx('next-btn')}>
                    &gt;
                </button>
            </div>
            <div className={cx('blog-btn')}>
                <Button to="/blog" primary>
                    View More Blogs
                </Button>
            </div>
        </div>
    );
}

export default BlogDetail;
