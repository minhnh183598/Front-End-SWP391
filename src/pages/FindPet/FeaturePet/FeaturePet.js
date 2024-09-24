
import styles from './FeaturePet.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import ICONS from '~/assets/icons';

const cx = classNames.bind(styles);

function FeaturePet({data}) {
    const [index, setIndex] = useState(0);
    const [lovePet, setLovePet] = useState([]);

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const petsToShow = [
        data[index % data.length],
        data[(index + 1) % data.length],
        data[(index + 2) % data.length],
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
                                                : pet.state === 'Adopted'
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
                                                pet.state === 'Adopted'? 'unavailable-state': null,
                                            )}
                                        >
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
            </div>
        </>
    );
}

export default FeaturePet;
