import Button from '~/components/Button';
import styles from './AddPet.module.scss';
import classNames from 'classnames/bind';
import api from '~/config/axios';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AddPet({setAddPet}) {
    const [formData, setFormData] = useState({
        petName: '',
        petType: 'Dog',
        petAge: 'Young',
        petBreed: '',
        petColor: 'Black', 
        petDescription: '',
        petSize: '',
        petWeight: '',
        petGender: 'Male',
        petVaccin: 'Yes', 
        petStatus: 'Available', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('pets', formData, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            console.log(formData);
            console.log(response.data);

            setAddPet(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Add New Pet</h1>

            <div className={cx('content')}>
                <form className={cx('form-wrapper')} onSubmit={handleSubmit}>
                    <div className={cx('form')}>
                        <div className={cx('form-input')}>
                            <div className={cx('input-detail')}>
                                <label htmlFor="petName">Name</label>
                                <input
                                    type="text"
                                    id="petName"
                                    name="petName"
                                    value={formData.petName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petBreed">Breed</label>
                                <input
                                    type="text"
                                    id="petBreed"
                                    name="petBreed"
                                    value={formData.petBreed}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petAge">Age</label>
                                <select id="petAge" name="petAge" value={formData.petAge} onChange={handleChange}>
                                    <option value="Young">Young</option>
                                    <option value="Grown">Full Grown</option>
                                    <option value="Old">Old</option>
                                </select>
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petGender">Gender</label>
                                <select
                                    id="petGender"
                                    name="petGender"
                                    value={formData.petGender}
                                    onChange={handleChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petType">Type</label>
                                <select id="petType" name="petType" value={formData.petType} onChange={handleChange}>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </select>
                            </div>
                        </div>

                        <div className={cx('form-input')}>
                            <div className={cx('input-detail')}>
                                <label htmlFor="petColor">Colour</label>
                                <select id="petColor" name="petColor" value={formData.petColor} onChange={handleChange}>
                                    <option value="Black">Black</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="White">White</option>
                                </select>
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petSize">Size</label>
                                <input
                                    type="number"
                                    id="petSize"
                                    name="petSize"
                                    value={formData.petSize}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petWeight">Weight</label>
                                <input
                                    id="petWeight"
                                    type="number"
                                    name="petWeight"
                                    value={formData.petWeight}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petVaccin">Vaccine</label>
                                <select
                                    id="petVaccin"
                                    name="petVaccin"
                                    value={formData.petVaccin}
                                    onChange={handleChange}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div className={cx('input-detail')}>
                                <label htmlFor="petStatus">Status</label>
                                <select
                                    id="petStatus"
                                    name="petStatus"
                                    value={formData.petStatus}
                                    onChange={handleChange}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Adopted">Adopted</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={cx('form-des')}>
                        <div className={cx('input-description')}>
                            <label htmlFor="petDescription">Description</label>
                            <textarea
                                id="petDescription"
                                name="petDescription"
                                value={formData.petDescription}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className={cx('form-btn')}>
                        <Button type="submit" primary medium mgRight10>
                            Add
                        </Button>
                        <Button outline medium onClick={() => setAddPet(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPet;
