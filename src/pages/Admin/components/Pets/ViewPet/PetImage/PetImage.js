import { useState } from 'react';
import styles from './PetImage.module.scss';
import classNames from 'classnames/bind';
import PetImages from '~/assets/images/petImg';
const cx = classNames.bind(styles);

function PetImage() {
    const [index, setIndex] = useState(0);
    const petImg = [PetImages.dog, PetImages.dog2, PetImages.dog3, PetImages.cat1, PetImages.cat2, PetImages.cat3];

    const petsToShow =
        petImg.length > 0
            ? petImg.slice(index, index + 5).concat(petImg.slice(0, Math.max(0, index + 5 - petImg.length)))
            : [];

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % petImg.length);
    };

    const preSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + petImg.length) % petImg.length);
    };
    return (
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
    );
}

export default PetImage;
