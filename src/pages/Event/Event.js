import { useState } from "react";
import IMAGES from "~/assets/images";
import styles from './Event.module.scss';
import classNames from 'classnames/bind';
import ShortFilter from "./components/ShortFilter";
import BlogList from "./components/EventList";

const cx = classNames.bind(styles);

function Event() {
    const [searchName, setSearchName] = useState('');
    const [filter, setFilter] = useState({
        sort: 'all',
        type: 'all',
    });

    const eventData = [
        {
            id:1,
            image: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 July 2024',
        },
        {
            id:2,
            image: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '23 Jan 2024',
        },
        {
            id:3,
            image: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Oct 2024',
        },
        {
            id:4,
            image: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: '222 Pasteur District 3, Ho Chi Minh City',
            date: '12 Dec 2024',
        },
        {
            id:5,
            image: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '25 July 2024',
        },
        {
            id:6,
            image: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Feb 2024',
        },
        {
            id:7,
            image: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: '222 Pasteur District 3, Ho Chi Minh City',
            date: '12 Dec 2024',
        },
        {
            id:8,
            image: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '25 July 2024',
        },
        {
            id:9,
            image: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Feb 2024',
        },
        {
            id:10,
            image: IMAGES.event3,
            title: 'Do you understand your pets?',
            location: '222 Pasteur District 3, Ho Chi Minh City',
            date: '12 Dec 2024',
        },
        {
            id:11,
            image: IMAGES.event2,
            title: 'Do you love your pets? Join with us on sunday!!!',
            location: 'FPT University, Thu Duc City',
            date: '25 July 2024',
        },
        {
            id:12,
            image: IMAGES.event1,
            title: 'Pet show very cute dogs and cats if you go with us you can touch them',
            location: 'District 3, Ho Chi Minh City',
            date: '25 Feb 2024',
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
                <img src={IMAGES.eventBanner} alt="banner" />
            </div>

            <div className={cx('content')}>
                <h1>Events</h1>

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
                    <BlogList data={eventData} dataLength={eventData.length}/>
                </div>
            </div>
        </div>
    );
}

export default Event;
