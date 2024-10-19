import Button from '~/components/Button';
import styles from './Pets.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Pets() {
    const [currentPage, setCurrentPage] = useState(1);
    const data = [
        {
            id: 23,
            petname: 'Minh',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 2,
            petname: 'Donny',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 3,
            petname: 'Luna',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 12,
            petname: 'Long',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 978,
            petname: 'Tuan',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 105,
            petname: 'Jack',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 17,
            petname: 'Long',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 979,
            petname: 'Tuan',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 15,
            petname: 'Jack',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 123,
            petname: 'Long',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 97,
            petname: 'Tuan',
            role: 'Available',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 10,
            petname: 'Jack',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 11,
            petname: 'Jack',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 19,
            petname: 'Jack',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
        {
            id: 22,
            petname: 'Jack',
            role: 'Adopted',
            noa: 12,
            enrolled: '23/01/2024',
        },
    ];

    const petPerPage = 12;
    const indexOfLastPet = currentPage * petPerPage;
    const indexOfFirstPet = indexOfLastPet - petPerPage; 
    const currentPet = data.slice(indexOfFirstPet, indexOfLastPet);
    return (
        <>
            <h1>Pets</h1>
            <div className={cx('wrapper')}>
                <div className={cx('user-sum')}>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>231</p>
                            <p className={cx('item-label')}>Available Pets</p>
                        </div>
                        <span>+2.15%</span>
                    </div>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>220</p>
                            <p className={cx('item-label')}>Adopted Pets</p>
                        </div>
                        <span>-3.5%</span>
                    </div>
                    <div className={cx('user-sum-item')}>
                        <div>
                            <p className={cx('item-number')}>10</p>
                            <p className={cx('item-label')}>New Pets</p>
                        </div>
                        <span>-3.5%</span>
                    </div>
                </div>

                <div className={cx('user-content')}>
                    <div className={cx('header')}>
                        <div className={cx('sort')}>
                            <p className={cx('active')}>View All</p>
                            <p>Available</p>
                            <p>Adopted</p>
                        </div>

                        <div className={cx('add-pet')}>
                            <Button small primary>
                                Add Pet
                            </Button>
                        </div>

                        <div className={cx('search')}>
                            <form>
                                <label htmlFor="sort">Sort by</label>
                                <select id="sort" name="sort">
                                    <option value="all">All</option>
                                    <option value="sortByWeight">ID</option>
                                    <option value="sortByAge">Create Date</option>
                                    <option value="sortByName">Number of Application</option>
                                </select>

                                <input type="text" placeholder="Search by name" />
                                <Button primary small type="submit">
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className={cx('main-content')}>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('header-content')}>
                                <p className={cx('id')}>ID</p>
                                <p className={cx('name')}>Name</p>
                                <p className={cx('role')}>Status</p>
                                <p className={cx('appli')}>Number of application</p>
                                <p className={cx('date')}>Create Date</p>
                            </div>
                            <div className={cx('content')}>
                                {currentPet.map((user) => (
                                    <div className={cx('content-item')} key={user.id}>
                                        <p className={cx('id')}>#{user.id}</p>
                                        <div className={cx('name')}>
                                            <p className={cx('username')}>{user.petname}</p>
                                            <FontAwesomeIcon icon={faEye} className={cx('view-icon')} />
                                        </div>
                                        <div className={cx('role')}>
                                            <p
                                                className={cx(
                                                    `${
                                                        user.role == 'Adopted'
                                                            ? 'adopted'
                                                            : user.role == 'Available'
                                                            ? 'available'
                                                            : ''
                                                    }`,
                                                )}
                                            >
                                                {user.role}
                                            </p>
                                        </div>
                                        <p className={cx('appli')}>{user.noa}</p>
                                        <p className={cx('date')}>{user.enrolled}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('pagination')}>
                            <Pagination
                                style={{ display: 'block' }}
                                current={currentPage}
                                defaultCurrent={1}
                                total={data.length}
                                pageSize={petPerPage}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pets;
