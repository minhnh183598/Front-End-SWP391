import styles from './PetContent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PetContent({ currentPet, setPetID, setViewPet }) {
    return (
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
                    <p className={cx('date')}>
                        {pet.createdPetAt ? new Date(pet.createdPetAt).toLocaleDateString() : ''}
                    </p>
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PetContent;
