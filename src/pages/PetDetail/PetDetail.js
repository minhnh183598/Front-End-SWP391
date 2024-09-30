import PetImages from '~/assets/images/petImg';
import styles from './PetDetail.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import api from '~/config/axios';
import Update from './components/Update';
import RegisBanner from '~/components/Layout/components/RegisterBanner';

const cx = classNames.bind(styles);

function PetDetail() {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState();
    const [userRoles, setUserRoles] = useState('');
    const [update, setUpdate] = useState(false);
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [formData, setFormData] = useState({
        petName: '',
        petBreed: '',
        petAge: '',
        petGender: '',
        petColor: '',
        petSize: '',
        petWeight: '',
        petVaccin: '',
        petDescription: '',
    });

    const handlePetData = async () => {
        try {
            const response = await api.get(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            setPet(response.data);
            localStorage.setItem('petData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
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

        handlePetData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (pet) {
            setFormData({
                petName: pet.petName || '',
                petBreed: pet.petBreed || '',
                petAge: pet.petAge || '',
                petGender: pet.petGender || '',
                petColor: pet.petColor || '',
                petSize: pet.petSize || '',
                petWeight: pet.petWeight || '',
                petVaccin: pet.petVaccin || '',
                petDescription: pet.petDescription || '',
            });
        }
    }, [pet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setUpdate(false);
        console.log(formData);
    };

    if (!pet) {
        return <div>Loading...</div>;
    }

    const toggleUpdate = () => {
        setUpdate(!update);
        window.scrollTo({
            top: 500,
            behavior: 'smooth',
        });
    };

    const closeUpdate = () => {
        setUpdate(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const petImg = [PetImages.dog, PetImages.dog2, PetImages.dog3, PetImages.cat1, PetImages.cat2, PetImages.cat3];

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % petImg.length);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + petImg.length) % petImg.length);
    };

    // const petsToShow =
    //     petImg.length > 0
    //         ? [petImg[index], petImg[(index + 1) % petImg.length], petImg[(index + 2) % petImg.length], petImg[(index + 3) % petImg.length], petImg[(index + 4) % petImg.length]]
    //         : [];

    const petsToShow =
        petImg.length > 0
            ? petImg.slice(index, index + 5).concat(petImg.slice(0, Math.max(0, index + 5 - petImg.length)))
            : [];
    return (
        <div>
            <div className={cx('wrapper')}>
                <h1>Do you love {pet.petName}?</h1>
                <div className={cx('content')}>
                    <div className={cx('pet-image')}>
                        <button onClick={preSlide} className={cx('slideBtn', 'pre-btn')}>
                            &lt;
                        </button>
                        <div className={cx('image')}>
                            <img src={petImg[index]} />

                            <div className={cx('sub-img')}>
                                {petsToShow.map((image, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={image}
                                        className={cx({ 'color-border': imgIndex === 0 })}
                                        onClick={() => {
                                            const newIndex = (index + imgIndex) % petImg.length;
                                            setIndex(newIndex);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button onClick={nextSlide} className={cx('slideBtn', 'next-btn')}>
                            &gt;
                        </button>
                    </div>

                    <div className={cx('pet-info')}>
                        <div className={cx('detail-info')}>
                            <h2>{pet.petName}</h2>
                            <div className={cx('detail-item')}>
                                <div>
                                    <p>
                                        <b>Type:</b> {pet.petType}
                                    </p>

                                    <p>
                                        <b>Age:</b> {pet.petAge}
                                    </p>
                                    <p>
                                        <b>Gender:</b> {pet.petGender}
                                    </p>
                                    <p>
                                        <b>Colour:</b> {pet.petColor}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <b>Breed:</b> {pet.petBreed}
                                    </p>
                                    <p>
                                        <b>Size:</b> {pet.petSize} cm
                                    </p>
                                    <p>
                                        <b>Weight:</b> {pet.petWeight} kg
                                    </p>
                                    <p>
                                        <b>Vaccine:</b> {pet.petVaccin}
                                    </p>
                                </div>
                            </div>

                            <div className={cx('adopt')}>
                                {pet.petStatus === 'Adopted' ? (
                                    <Button medium disable>
                                        Adopted
                                    </Button>
                                ) : (
                                    <>
                                        <Button medium primary>
                                            Adopt Now
                                        </Button>
                                        <Button medium outline>
                                            Donate
                                        </Button>
                                    </>
                                )}

                                <div className={cx('admin-btn')}></div>
                            </div>

                            {user && userRoles === 'user' ? (
                                <div className={cx('edit')}>
                                    <Button className={cx('update-btn')} primary medium onClick={toggleUpdate}>
                                        Update
                                    </Button>
                                    <Button className={cx('update-btn')} outline medium>
                                        Delete
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                        <div className={cx('story')}>
                            <h2>Story</h2>
                            <div className={cx('description-wrapper')}>
                                <p className={cx('description')}>{pet.petDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {update && (
                    <Update
                        handleSubmit={handleSubmit}
                        formData={formData}
                        handleChange={handleChange}
                        closeUpdate={closeUpdate}
                    />
                )}
            </div>

            {}
            {!user ? <RegisBanner /> : null}
        </div>
    );
}

export default PetDetail;
