import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IMAGES from '~/assets/images';
import api from '~/config/axios';
import './AdoptStep2Form.scss';
import Button from '~/components/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const AdoptStep2Form = ({ setStep }) => {
    const [formData, setFormData] = useState({
        age_of_child: '',
        num_of_children: '',
        address: '',
        city: '',
        full_name: '',
        gender: '',
        job: '',
        live_with: '',
        phone: '',
        yob: '',
        first_person: '',
        first_phone: '',
        second_person: '',
        second_phone: '',
    });

    useEffect(() => {
        const savedFormData = localStorage.getItem('applicationFormData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('applicationFormData', JSON.stringify(formData));
    // }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // console.log(formData);
    const handleSubmit = () => {
        let response = axios.post(formData);
    };
    return (
        <div className="AdoptStep2">
            <ScrollToTop />
            {/* Phần nhập thông tin người dùng */}
            <div className="infoInput-wrap">
                <div className="AdoptStep2-infoInput">
                    <div className="wrap-wrap">
                        <div className="AdoptStep2-h3-wrap">
                            <h3>ADOPTION FORM</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="name_yob_address_city_wrap">
                            <div className="wrap_name_yob">
                                {/* Name  */}
                                <div className="AdoptStep2-infoInputbar-wrap-name">
                                    <label htmlFor="name">Full name</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        // placeholder="Full name"
                                    />
                                </div>
                                {/* yob  */}
                                <div className="AdoptStep2-infoInputbar-wrap-yob">
                                    <label htmlFor="yob">Year of birth</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="date"
                                        id="yob"
                                        name="yob"
                                        value={formData.yob}
                                        onChange={handleChange}
                                        required
                                        // placeholder="yob"
                                    />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="AdoptStep2-infoInputbar-wrap-address">
                                <label htmlFor="address">Address</label>
                                <input
                                    className="AdoptStep2-infoInput-bar"
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    // placeholder="address"
                                />
                            </div>
                            {/* City  */}
                            <div className="AdoptStep2-infoInputbar-wrap-city">
                                <label htmlFor="city">City</label>
                                <input
                                    className="AdoptStep2-infoInput-bar"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    // placeholder="city"
                                />
                            </div>
                        </div>
                        <div className="gender_phone_job_livewith_wrap">
                            <div className="gender_phone_wrap">
                                {/* Gender  */}
                                <div className="AdoptStep2-infoInputbar-wrap-gender">
                                    <label htmlFor="gender">Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                {/* phone  */}
                                <div className="AdoptStep2-infoInputbar-wrap-phone">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        // placeholder="phone"
                                    />
                                </div>
                            </div>
                            <div className="job_livewith_wrap">
                                {/* job  */}
                                <div className="AdoptStep2-infoInputbar-wrap-job">
                                    <label htmlFor="job">Job</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="job"
                                        name="job"
                                        value={formData.job}
                                        onChange={handleChange}
                                        required
                                        // placeholder="job"
                                    />
                                </div>
                                {/* live with  */}
                                <div className="AdoptStep2-infoInputbar-wrap-livewith">
                                    <label htmlFor="live_with">Live with</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="live_with"
                                        name="live_with"
                                        value={formData.live_with}
                                        onChange={handleChange}
                                        required
                                        // placeholder="live_with"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="RE1_RE1Phone_RE2_RE2Phone_wrap">
                            <div className="RE1_RE1Phone">
                                {/* first_person */}
                                <div className="AdoptStep2-infoInputbar-wrap-RE1">
                                    <label htmlFor="first_person">Reference person 1 (RE1)</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="first_person"
                                        name="first_person"
                                        value={formData.first_person}
                                        onChange={handleChange}
                                        // placeholder="first_person"
                                    />
                                </div>
                                {/* first_phone */}
                                <div className="AdoptStep2-infoInputbar-wrap_RE1Phone">
                                    <label htmlFor="first_phone">RE1 phone</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="first_phone"
                                        name="first_phone"
                                        value={formData.first_phone}
                                        onChange={handleChange}
                                        // placeholder="first_phone"
                                    />
                                </div>
                            </div>
                            <div className="RE2_RE2Phone">
                                {/* second_person */}
                                <div className="AdoptStep2-infoInputbar-wrap-RE2">
                                    <label htmlFor="second_person">Reference person 2 (RE2)</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="second_person"
                                        name="second_person"
                                        value={formData.second_person}
                                        onChange={handleChange}
                                        // placeholder="second_person"
                                    />
                                </div>
                                {/* second_phone */}
                                <div className="AdoptStep2-infoInputbar-wrap-RE2Phone">
                                    <label htmlFor="second_phone">RE2 phone</label>
                                    <input
                                        className="AdoptStep2-infoInput-bar"
                                        type="text"
                                        id="second_phone"
                                        name="second_phone"
                                        value={formData.second_phone}
                                        onChange={handleChange}
                                        // placeholder="second_phone"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="AdoptStep2-button">
                        <Button className="btn-1" onClick={() => setStep((prevStep) => prevStep + 1)}>
                            Next
                        </Button>
                        <Button onClick={() => setStep((prevStep) => prevStep - 1)} className="btn-2">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdoptStep2Form;
