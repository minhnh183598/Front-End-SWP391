import IMAGES from '~/assets/images';
import styles from './Events.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Events() {
    const [index, setIndex] = useState(0);
    const eventData = [
        {
            img: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 July 2024',
        },
        {
            img: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '23 Jan 2024',
        },
        {
            img: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Oct 2024',
        },
        {
            img: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: 'District 3, Ho Chi Minh City',
            date: '12 Dec 2024',
        },
        {
            img: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '25 July 2024',
        },
        {
            img: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Feb 2024',
        },
    ];

    const preSlide = () => {
        setIndex((preIndex) => (preIndex - 1 + eventData.length) % eventData.length);
    };

    const nextSlide = () => {
        setIndex((preIndex) => (preIndex + 1) % eventData.length);
    };

    const eventShow = [
        eventData[index % eventData.length],
        eventData[(index + 1) % eventData.length],
        eventData[(index + 2) % eventData.length],
    ];

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className={cx('events')}>
                <h1 className={cx('main-heading')}>Events</h1>
                <p className={cx('main-slogan')}>Love, Care, Companionship</p>

                <div className={cx('content')}>
                    <button onClick={preSlide} className={cx('pre-btn')}>
                        &lt;
                    </button>
                    <div className={cx('event-container')}>
                        {eventShow.map((event, index) => {
                            const [day, month, year] = event.date.split(' ');
                            return (
                                <div className={cx('event-box')} key={index}>
                                    <div className={cx('image')}>
                                        <img src={event.img} />
                                        <div className={cx('date')}>
                                            <p className={cx('date-detail')}>
                                                {month}
                                                <br />
                                                {day}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={cx('event-info')}>
                                        <h3>{event.title}</h3>
                                        <p>{event.location}</p>
                                    </div>

                                    <Button small outline className={cx('event-btn')} to="/blog">
                                        View
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={nextSlide} className={cx('next-btn')}>
                        &gt;
                    </button>
                </div>

                <Button primary xlarge to="/events" className={cx('link-btn')}>
                    View More Event
                </Button>
            </div>
        </>
    );
}

export default Events;
