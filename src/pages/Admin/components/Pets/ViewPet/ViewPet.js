import api from '~/config/axios';
import PetImage from './PetImage/PetImage';
import styles from './ViewPet.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ViewPet({id}) {
    const [pet, setPet] = useState(null);
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
        handlePetData();
    }, []);

    if (!pet) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('wrapper')}>
            <PetImage/>
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
                </div>
                <div className={cx('story')}>
                    <h2>Story</h2>
                    <div className={cx('description-wrapper')}>
                        <p className={cx('description')}>{pet.petDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPet;
