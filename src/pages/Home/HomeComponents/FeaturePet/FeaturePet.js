import { Col, Container, Row } from 'react-bootstrap';
import styles from './FeaturePet.module.scss';
import classNames from 'classnames/bind';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import PetImages from '~/assets/images/petImg';
import ICONS from '~/assets/icons';

const cx = classNames.bind(styles);

function FeaturePet() {
    const [index, setIndex] = useState(0);
    const [lovePet, setLovePet] = useState([]);

    const petData = [
        {
            id: 1,
            img: PetImages.cat1,
            state: 'Available',
            name: 'Miu',
            location: 'Ho Chi Minh City',
            old: '2 years old',
        },
        {
            id: 2,
            img: PetImages.dog3,
            state: 'Unavailable',
            name: 'Donny',
            location: 'Ho Chi Minh City',
            old: '4 years old',
        },
        {
            id: 3,
            img: PetImages.dog2,
            state: 'On Hold',
            name: 'KiKi',
            location: 'Ho Chi Minh City',
            old: '1 years old',
        },
        {
            id: 4,
            img: PetImages.dog,
            state: 'Available',
            name: 'Sen',
            location: 'Ho Chi Minh City',
            old: '2 years old',
        },
        {
            id: 5,
            img: PetImages.cat3,
            state: 'Unavailable',
            name: 'Kitty',
            location: 'Ho Chi Minh City',
            old: '2 years old',
        },
        {
            id: 6,
            img: PetImages.cat2,
            state: 'On Hold',
            name: 'Bunny',
            location: 'Ho Chi Minh City',
            old: '2 years old',
        },
    ];

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % petData.length);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + petData.length) % petData.length);
    };

    const petsToShow = [
        petData[index % petData.length],
        petData[(index + 1) % petData.length],
        petData[(index + 2) % petData.length],
    ];

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleWishlist = (pet) => {
        console.log(pet.id);

        setLovePet((pre) => ({ ...pre, [pet.id]: !pre[pet.id] }));
    };

    return (
        <>
            <div className={cx('feature-pets')}>
                <h1 className={cx('main-heading')}>Feature Pets</h1>
                <p className={cx('main-slogan')}>Love, Care, Companionship</p>

                <div className={cx('content')}>
                    <button onClick={preSlide} className={cx('pre-btn')}>
                        &lt;
                    </button>
                    <div className={cx('pet-container')}>
                        {petsToShow.map((pet) => (
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
                                            pet.state === 'Available'
                                                ? 'available-state'
                                                : pet.state === 'Unavailable'
                                                ? 'unavailable-state'
                                                : 'onhold-state',
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
                                        </div>

                                        <p className={cx('old')}>{pet.old}</p>
                                    </div>

                                    <div className={cx('pet-btn')}>
                                        <Button mgRight10 outline small to="/" className={cx('btn')}>
                                            Detail
                                        </Button>
                                        <Button primary small to="/" className={cx('btn')}>
                                            Adopt
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

                <Button primary xlarge to="/find-a-pet" className={cx('link-btn')}>
                    View All Adoptable Pets
                </Button>
            </div>
        </>
    );
}

export default FeaturePet;
