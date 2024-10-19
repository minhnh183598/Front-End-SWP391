import { useEffect, useState } from 'react';
import styles from './ViewAppli.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import PetImages from '~/assets/images/petImg';
import Button from '~/components/Button';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function ViewAppli({ id, setViewAppli }) {
    const [appli, setAppli] = useState(null);

    const handleAppliData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppli(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleAppliData();
    }, []);

    if (!appli) {
        return <div>Loading...</div>;
    }

    const handleApproveSuccess = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `applications/status/${id}`,
                {
                    status: 1, // Gửi body với status là 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            alert('Update successfully');
            setViewAppli(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApproveFail = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(
                `applications/status/${id}`,
                {
                    status: 2, // Gửi body với status là 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            alert('Update successfully');
            setViewAppli(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteAppli = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Delete successfully');
            setViewAppli(false);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <p style={{ cursor: 'pointer', width: '70px' }} onClick={() => setViewAppli(false)}>
                    &larr;Back
                </p>

                <p style={{ marginBottom: '10px', fontSize: '12px' }}>Application ID: {appli.applicationId}</p>
                <p style={{ marginBottom: '10px', fontSize: '12px' }}>
                    Create Date: {appli.createAt ? new Date(appli.createAt).toLocaleDateString() : ''}
                </p>
                <div className={cx('main-content')}>
                    <div className={cx('container')}>
                        <div className={cx('pet')}>
                            <div className={cx('pet-image')}>
                                <img src={PetImages.cat1} />
                            </div>
                            <div className={cx('pet-info')}>
                                <p style={{ fontSize: '12px', marginTop: '2px' }}>
                                    <b>Pet ID:</b> {appli.pet.petId}
                                </p>
                                <div className={cx('pet-info-heading')}>
                                    <h4>{appli.pet.petName}</h4>
                                    <p className={cx(`${appli.pet.petStatus == 'Adopted' ? 'adopted' : ''}`)}>
                                        {appli.pet.petStatus}
                                    </p>
                                </div>
                                <div className={cx('pet-detail')}>
                                    <div>
                                        <p>
                                            <b>Breed:</b> {appli.pet.petBreed}
                                        </p>
                                        <p>
                                            <b>Age:</b> {appli.pet.petAge}
                                        </p>
                                        <p>
                                            <b>Color:</b> {appli.pet.petColor}
                                        </p>
                                        <p style={{ margin: 0 }}>
                                            <b>Vaccin:</b> {appli.pet.petVaccin}
                                        </p>
                                    </div>
                                    <div style={{ marginLeft: '20px' }}>
                                        <p>
                                            <b>Weight:</b> {appli.pet.petWeight}
                                        </p>
                                        <p>
                                            <b>Size:</b> {appli.pet.petSize}
                                        </p>
                                        <p>
                                            <b>Gender:</b> {appli.pet.petGender}
                                        </p>
                                        <p style={{ margin: 0 }}>
                                            <b>Type:</b> {appli.pet.petType}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('adopter')}>
                            <p style={{ fontSize: '12px' }}>
                                <b>User ID:</b> {appli.user.id}
                            </p>
                            <div className={cx('user-info')}>
                                <div className={cx('user-info-heading')}>
                                    <h4>{appli.fullName}</h4>
                                </div>
                                <div className={cx('user-detail')}>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <p>
                                                <b>YOB:</b> {appli.yob}
                                            </p>
                                            <p>
                                                <b>Gender:</b> {appli.gender}
                                            </p>
                                        </div>
                                        <div style={{ marginLeft: '20px' }}>
                                            <p>
                                                <b>Job:</b> {appli.job}
                                            </p>
                                            <p>
                                                <b>Phone:</b> {appli.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        <b>Address:</b> {appli.address}
                                    </p>
                                    <p>
                                        <b>City:</b> {appli.city}
                                    </p>
                                    <p>
                                        <b>Live in:</b> {appli.liveIn}
                                    </p>
                                    <p>
                                        <b>Live with:</b> {appli.liveWith}
                                    </p>
                                    <p>
                                        <b>First Person:</b> {appli.firstPerson} - {appli.firstPhone}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        <b>Second Person:</b> {appli.secondPerson} - {appli.secondPhone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '15px',
                        }}
                    >
                        <div className={cx('approve-btn')}>
                            <Button primary medium mgRight10 onClick={handleApproveSuccess}>
                                Pass
                            </Button>
                            <Button medium onClick={handleApproveFail}>
                                Not Pass
                            </Button>
                        </div>

                        <p style={{ margin: 0, color: 'red', cursor: 'pointer' }} onClick={handleDeleteAppli}>
                            Delete <FontAwesomeIcon icon={faTrash} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewAppli;
