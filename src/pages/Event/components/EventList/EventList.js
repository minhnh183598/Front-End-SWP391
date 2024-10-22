import Button from '~/components/Button';
import styles from './EventList.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Pagination } from 'antd';
import IMAGES from '~/assets/images';

const cx = classNames.bind(styles);

function EventList({ data, dataLength }) {
    const [currentPage, setCurrentPage] = useState(1);

    const eventPerPage = 9;
    const indexOfLastEvent = currentPage * eventPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
    const currentEvent = data.slice(indexOfFirstEvent, indexOfLastEvent);
    // console.log('DAy la currenevent', currentEvent);
    console.log('event title', currentEvent);
    return (
        <div className={cx('event-list')}>
            {currentEvent.map((event) => {
                const [year, month, day] = event.date.split('-');
                console.log(day);
                console.log(month);
                console.log(year);
                return (
                    <div className={cx('event-box')} key={event.id}>
                        <div className={cx('image')}>
                            <img src={event.image} />
                            <div className={cx('date')}>
                                <p className={cx('date-detail')}>
                                    {day}
                                    <br />
                                    {month}
                                </p>
                            </div>
                        </div>

                        <div className={cx('event-info')}>
                            <div className={cx('info')}>
                                <div className={cx('main-info')}>
                                    <h3>{event.name}</h3>
                                    <div className={cx('location_icon')}>
                                        <img src={IMAGES.destination_icon} alt="destination_icon" />
                                        <p>{event.location}</p>
                                    </div>
                                    <div className={cx('event_content')}>
                                        <p>{event.content}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('event-btn')}>
                                <Button
                                    to="/event-detail"
                                    mgRight10
                                    outline
                                    small
                                    className={cx('btn')}
                                    onClick={() => console.log(event.id)}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className={cx('pagination')}>
                <Pagination
                    style={{ display: 'block' }}
                    current={currentPage}
                    defaultCurrent={1}
                    total={dataLength}
                    pageSize={eventPerPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default EventList;
