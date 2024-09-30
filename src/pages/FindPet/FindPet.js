import IMAGES from '~/assets/images';
import styles from './FindPet.module.scss';
import classNames from 'classnames/bind';
import FeaturePet from './components/FeaturePet';
import RegisBanner from '~/components/Layout/components/RegisterBanner';
import { createContext, useEffect, useState } from 'react';
import api from '~/config/axios';
import PetList from './components/PetList';
import ShortFilter from './components/ShortFilter';
import FilterMenu from './components/FilterMenu/FilterMenu';

const cx = classNames.bind(styles);

function FindPet() {
    const [petList, setPetList] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [user, setUser] = useState();
    const [userRoles, setUserRoles] = useState('');
    const [searchName, setSearchName] = useState('');
    const [filter, setFilter] = useState({
        type: 'all',
        gender: 'all',
        age: 'all',
        color: 'all',
        state: 'available',
        vaccine: 'all',
        sort: 'all',
    });

    const handlePetsData = async () => {
        const { type, gender, age, color, vaccine, sort, state } = filter;
        const query = `petType=${type}&petAge=${age}&petGender=${gender}&petColor=${color}&petVaccin=${vaccine}&petStatus=${state}&keyword=${searchName}&sort=${sort}`;

        try {
            const response = await api.get(`pets/SearchPets?${query}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            const dataLength = response.data.length;
            setDataLength(dataLength);
            setPetList(response.data);
            localStorage.setItem('pet', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleFinish = async (e) => {
        if (e) e.preventDefault();
        await handlePetsData();

        const searchParams = {
            searchName,
            filter,
        };
        console.log(searchParams);
    };

    useEffect(() => {
        handlePetsData();

        const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (loggedUser) {
            setUser(loggedUser);
        }

        const roles = JSON.parse(localStorage.getItem('userRoles'));
        if (roles.includes('USER')) {
            setUserRoles('user');
        } else {
            setUserRoles('admin');
        }
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilter((pre) => ({ ...pre, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchName(e.target.value.trim());
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img src={IMAGES.findPetBanner} alt="banner" />

                {/* <h1>Adopt a pet, save a life!</h1> */}
            </div>

            {/* <FeaturePet /> */}

            <div className={cx('content')}>
                <h1>Find Your Pets</h1>

                <div className={cx('main-content')}>
                    <div className={cx('short-filter')}>
                        <ShortFilter
                            filter={filter}
                            handleFinish={handleFinish}
                            handleFilterChange={handleFilterChange}
                            searchName={searchName}
                            handleSearchChange={handleSearchChange}
                        />
                    </div>

                    <div className={cx('pet-content')}>
                        <FilterMenu
                            filter={filter}
                            handleFinish={handleFinish}
                            handleFilterChange={handleFilterChange}
                        />

                        {petList.length === 0 ? (
                            <p className={cx('null-pet-list')}>No pets found for your search.</p> // Show message if no pets found
                        ) : (
                            <PetList data={petList} dataLength={petList.length} />
                        )}
                    </div>
                </div>
            </div>

            {!user ? <RegisBanner /> : null}
        </div>
    );
}

export default FindPet;
