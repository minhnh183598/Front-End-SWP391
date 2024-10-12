import Button from '~/components/Button';
import styles from './Pets.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import api from '~/config/axios';
import AddPet from './AddPet/AddPet';
import ViewPet from './ViewPet/ViewPet';

const cx = classNames.bind(styles);

function Pets() {
    const [currentPage, setCurrentPage] = useState(1);
    const [petList, setPetList] = useState([]);
    const [addPet, setAddPet] = useState(false);
    const [dataLength, setDataLength] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [petID, setPetID] = useState('');
    const [viewPet, setViewPet] = useState(false);

    const handlePetsData = async () => {
        try {
            const response = await api.get(`pets`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const dataLength = response.data.length;
            console.log(response.data);
            setDataLength(dataLength);
            setPetList(response.data);
            localStorage.setItem('pet', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handlePetsData();
    }, [refresh]);

    const handleAddPet = () => {
        setAddPet(false);
        setRefresh((prev) => prev + 1);
    };

    const petPerPage = 12;
    const indexOfLastPet = currentPage * petPerPage;
    const indexOfFirstPet = indexOfLastPet - petPerPage;
    const currentPet = petList.slice(indexOfFirstPet, indexOfLastPet);

    return (
        <>
            {!addPet ? (
                <div className={cx('wrapper')}>
                    <h1>Pets</h1>

                    {!viewPet ? (
                        <>
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
                                        <Button small primary onClick={() => setAddPet(true)}>
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
                                            <p className={cx('appli')}>Adopter ID</p>
                                            <p className={cx('date')}>Create Date</p>
                                            <p className={cx('action')}>Action</p>
                                        </div>
                                        <div className={cx('content')}>
                                            {currentPet.map((pet) => (
                                                <div className={cx('content-item')} key={pet.petId}>
                                                    <p className={cx('id')}>#{pet.petId}</p>
                                                    <div className={cx('name')}>
                                                        <p className={cx('petname')}>{pet.petName}</p>
                                                    </div>
                                                    <div className={cx('role')}>
                                                        <p
                                                            className={cx(
                                                                `${
                                                                    pet.petStatus == 'Adopted'
                                                                        ? 'adopted'
                                                                        : pet.petStatus == 'Available'
                                                                        ? 'available'
                                                                        : ''
                                                                }`,
                                                            )}
                                                        >
                                                            {pet.petStatus}
                                                        </p>
                                                    </div>
                                                    <p className={cx('appli')}>#{pet.noa}</p>
                                                    <p className={cx('date')}>{pet.enrolled}</p>
                                                    <div className={cx('action')}>
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className={cx('view-icon')}
                                                            onClick={() => {
                                                                setPetID(pet.petId);
                                                                setViewPet(true);
                                                                console.log(pet.petId);
                                                            }}
                                                        />
                                                        <FontAwesomeIcon icon={faTrash} className={cx('delete-icon')} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cx('pagination')}>
                                        <Pagination
                                            style={{ display: 'block' }}
                                            current={currentPage}
                                            defaultCurrent={1}
                                            total={dataLength}
                                            pageSize={petPerPage}
                                            onChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <ViewPet id={petID}/>
                    )}
                </div>
            ) : (
                <AddPet setAddPet={handleAddPet} />
            )}
        </>
    );
}

export default Pets;
