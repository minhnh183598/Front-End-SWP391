import IMAGES from '~/assets/images';
import styles from './FindPet.module.scss';
import classNames from 'classnames/bind';
import FeaturePet from './FeaturePet';
import RegisBanner from '~/components/Layout/components/RegisterBanner';
import PetImages from '~/assets/images/petImg';
import { useState } from 'react';
import Button from '~/components/Button';
import ICONS from '~/assets/icons';
import { Checkbox, Form, Select, Slider } from 'antd';

const cx = classNames.bind(styles);

function FindPet() {
    const [lovePet, setLovePet] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [filter, setFilter] = useState({
        type: 'all',
        gender: 'all',
        age: 'all',
        colour: 'all',
        state: 'available',
        vaccine: 'all',
        sort: 'all',
    });


    const petData = [
        {
            id: 1,
            img: PetImages.cat1,
            state: 'Available',
            name: 'Miu',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: true,
            sex: 'male',
        },
        {
            id: 2,
            img: PetImages.dog3,
            state: 'Available',
            name: 'Donny',
            location: 'Ho Chi Minh City',
            old: '4 years old',
            vaccine: false,
            sex: 'female',
        },
        {
            id: 3,
            img: PetImages.dog2,
            state: 'Available',
            name: 'KiKi',
            location: 'Ho Chi Minh City',
            old: '1 years old',
            vaccine: true,
            sex: 'female',
        },
        {
            id: 4,
            img: PetImages.dog,
            state: 'Available',
            name: 'Sen',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: true,
            sex: 'male',
        },
        {
            id: 5,
            img: PetImages.cat3,
            state: 'Available',
            name: 'Kitty',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: false,
            sex: 'male',
        },
        {
            id: 6,
            img: PetImages.cat2,
            state: 'Available',
            name: 'Bunny',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: true,
            sex: 'male',
        },
        {
            id: 7,
            img: PetImages.dog,
            state: 'Available',
            name: 'Sen',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: true,
            sex: 'male',
        },
        {
            id: 8,
            img: PetImages.cat3,
            state: 'Available',
            name: 'Kitty',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: false,
            sex: 'male',
        },
        {
            id: 9,
            img: PetImages.cat2,
            state: 'Available',
            name: 'Bunny',
            location: 'Ho Chi Minh City',
            old: '2 years old',
            vaccine: true,
            sex: 'male',
        },
    ];

    const handleWishlist = (pet) => {
        console.log(pet.id);

        setLovePet((pre) => ({ ...pre, [pet.id]: !pre[pet.id] }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilter((pre) => ({ ...pre, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };

    const handleFinish = (e) => {
        e.preventDefault();

        const searchParams = {
            searchName,
            filter,
        };

        console.log(searchParams);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.findPetBanner} alt="banner" />

                <h1>Adopt a pet, save a life!</h1>
            </div>

            <FeaturePet data={petData} />

            <div className={cx('content')}>
                <h1>Find Your Pets</h1>

                <div className={cx('main-content')}>
                    <div className={cx('short-filter')}>
                        <form onSubmit={handleFinish} className={cx('short-form')}>
                            <div className={cx('sort')}>
                                <label htmlFor="sort">Sort</label>
                                <select id="sort" name="sort" value={filter.sort} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="weight">Weight</option>
                                    <option value="age">Age</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                            <div className={cx('search-name')}>
                                <label htmlFor="searchName">Search by name</label>
                                <input
                                    type="text"
                                    id="searchName"
                                    placeholder="Enter pet's name"
                                    value={searchName}
                                    onChange={handleSearchChange}
                                />

                                <Button primary small type="submit">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className={cx('pet-content')}>
                        <div className={cx('filter-menu')}>
                            <form className={cx('form')} onSubmit={handleFinish}>
                                <label htmlFor="type">Select pet type</label>
                                <select id="type" name="type" value={filter.type} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                </select>

                                <label htmlFor="gender">Gender</label>
                                <select id="gender" name="gender" value={filter.gender} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                <label htmlFor="age">Age</label>
                                <select id="age" name="age" value={filter.age} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="young">Young</option>
                                    <option value="grown">Full Grown</option>
                                    <option value="old">Old</option>
                                </select>

                                <label htmlFor="colour">Colour</label>
                                <select id="colour" name="colour" value={filter.colour} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="black">Black</option>
                                    <option value="yellow">Yellow</option>
                                </select>

                                <label htmlFor="state">State</label>
                                <select id="state" name="state" value={filter.state} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="available">Available</option>
                                    <option value="adopted">Adopted</option>
                                </select>

                                <label htmlFor="vaccine">Vaccine</label>
                                <select
                                    id="vaccine"
                                    name="vaccine"
                                    value={filter.vaccine}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">All</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>

                                <Button primary medium className={cx('submit-btn')} type="submit">
                                    Search
                                </Button>
                            </form>
                        </div>

                        <div className={cx('pet-list')}>
                            {petData.map((pet) => (
                                <div className={cx('pet-box')} key={pet.id}>
                                    <div className={cx('image')}>
                                        <img src={pet.img} />
                                        <img
                                            src={lovePet[pet.id] ? ICONS.heartRed : ICONS.heartWhi}
                                            className={cx('heart-icon')}
                                            onClick={() => handleWishlist(pet)}
                                        />
                                        <p
                                            className={cx(
                                                'pet-state',
                                                pet.state === 'Adopted' ? 'unavailable-state' : 'available-state',
                                            )}
                                        >
                                            {pet.state}
                                        </p>
                                    </div>

                                    <div className={cx('pet-info')}>
                                        <div className={cx('info')}>
                                            <div className={cx('main-info')}>
                                                <h3>{pet.name}</h3>
                                                <p>{pet.location}</p>

                                                <div className={cx('attr-icon')}>
                                                    {pet.vaccine ? <img src={ICONS.vaccineBl} /> : null}
                                                    <img src={pet.sex === 'male' ? ICONS.maleBl : ICONS.femaleBl} />
                                                </div>
                                            </div>

                                            <p className={cx('old')}>{pet.old}</p>
                                        </div>

                                        <div className={cx('pet-btn')}>
                                            <Button mgRight10 outline small to="/" className={cx('btn')}>
                                                Detail
                                            </Button>
                                            <Button
                                                primary
                                                small
                                                to="/"
                                                className={cx(
                                                    'btn',
                                                    pet.state === 'Adopted' ? 'unavailable-state' : null,
                                                )}
                                            >
                                                Adopt
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RegisBanner />
        </div>
    );
}

export default FindPet;
