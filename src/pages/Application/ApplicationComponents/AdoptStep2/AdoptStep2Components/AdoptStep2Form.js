import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import './AdoptStep2Form.scss';
import Button from '~/components/Button';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import IMAGES from '~/assets/images';

const AdoptStep2Form = ({ id, setStep }) => {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        fullName: '',
        gender: '',
        job: '',
        liveWith: '',
        phone: '',
        yob: '',
        first_person: '',
        firstPhone: '',
        secondPerson: '',
        secondPhone: '',
        date: '',
        from: '',
        to: '',
    });

    console.log(formData);

    const userID = localStorage.getItem('userId');
    // console.log('userID: ', userID);
    useEffect(() => {
        const savedFormData = localStorage.getItem('applicationFormData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // cu
    const handleNext = async (e) => {
        e.preventDefault();
        try {
            // Lưu dữ liệu biểu mẫu vào localStorage (tùy chọn)
            localStorage.setItem('applicationFormData', JSON.stringify(formData));
            setStep((prevStep) => prevStep + 1);

            // Lấy token từ localStorage
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Kiểm tra giá trị token

            if (!token) {
                throw new Error('Token không tồn tại. Vui lòng đăng nhập lại.');
            }

            const petId = id;

            if (!petId) {
                throw new Error('ID không hợp lệ. Vui lòng kiểm tra lại.');
            }

            // Chuyển đổi kiểu dữ liệu nếu cần
            const newFormData = {
                applicationId: '', // Bạn có thể để rỗng nếu tạo mới
                petId: petId,
                id: userID,
                fullName: formData.fullName,
                yob: parseInt(formData.yob, 10),
                gender: formData.gender,
                address: formData.address,
                city: formData.city,
                job: formData.job,
                phone: formData.phone,
                liveIn: formData.liveIn,
                liveWith: formData.liveWith,
                firstPerson: formData.first_person,
                firstPhone: formData.firstPhone,
                secondPerson: formData.secondPerson,
                secondPhone: formData.secondPhone,
                dateIn: formData.date,
                timeIn: formData.from,
                timeOut: formData.to,
                status: 1,
            };
            console.log('Sending data:', newFormData);

            // Gửi dữ liệu biểu mẫu đến backend
            try {
                const response = await api.post(`applications`, newFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const appliId = response.data.applicationId;

                localStorage.setItem('applicationId', appliId);
                console.log(response.data);
            } catch (error) {
                console.log('Loi nhu cc: ', error);
                if (error.response) {
                    console.log('Data:', error.response.data);
                    console.log('Status:', error.response.status);
                    console.log('Headers:', error.response.headers);
                } else {
                    console.log('Error message:', error.message);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response) {
                console.log('Error Data:', error.response.data);
            } else {
                console.log('Error Message:', error.message);
            }
        }
    };

    return (
        <div className="AdoptStep2">
            <ScrollToTop />
            {/* Phần nhập thông tin người dùng */}
            <div className="infoInput-wrap">
                <div className="AdoptStep2-infoInput">
                    <img className="AdoptStep2-infoInput-logo" src={IMAGES.logo} alt="logo" />
                    <div className="wrap-wrap">
                        <div className="AdoptStep2-h3-wrap">
                            <h3>PET ADOPTION APPLICATION FORM</h3>
                        </div>
                    </div>
                    <form>
                        {/* Name  */}
                        <div className="AdoptStep2-infoInputbar-wrap-name">
                            <label htmlFor="fullName">Full name</label>
                            <input
                                className="AdoptStep2-infoInput-bar"
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                // placeholder="Full name"
                            />
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
                        {/* Gender  */}
                        <div className="AdoptStep2-infoInputbar-wrap-gender">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
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
                        <div className="wrap-city-job">
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
                        </div>
                        {/* live with  */}
                        <div className="AdoptStep2-infoInputbar-wrap-livewith">
                            <label htmlFor="liveWith">Who do you live with ?</label>
                            <input
                                className="AdoptStep2-infoInput-bar"
                                type="text"
                                id="liveWith"
                                name="liveWith"
                                value={formData.liveWith}
                                onChange={handleChange}
                                required
                                // placeholder="live_with"
                            />
                        </div>
                        {/* first_person */}
                        <div className="AdoptStep2-infoInputbar-wrap-RE1">
                            <label htmlFor="first_person">Reference person #1</label>
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
                            <label htmlFor="firstPhone">Phone number #1</label>
                            <input
                                className="AdoptStep2-infoInput-bar"
                                type="text"
                                id="firstPhone"
                                name="firstPhone"
                                value={formData.firstPhone}
                                onChange={handleChange}
                                // placeholder="first_phone"
                            />
                        </div>
                        {/* second_person */}
                        <div className="AdoptStep2-infoInputbar-wrap-RE2">
                            <label htmlFor="secondPerson">Reference person #2</label>
                            <input
                                className="AdoptStep2-infoInput-bar"
                                type="text"
                                id="secondPerson"
                                name="secondPerson"
                                value={formData.secondPerson}
                                onChange={handleChange}
                                // placeholder="second_person"
                            />
                        </div>
                        {/* second_phone */}
                        <div className="AdoptStep2-infoInputbar-wrap-RE2Phone">
                            <label htmlFor="secondPhone">Phone Number #2</label>
                            <input
                                className="AdoptStep2-infoInput-bar"
                                type="text"
                                id="secondPhone"
                                name="secondPhone"
                                value={formData.secondPhone}
                                onChange={handleChange}
                                // placeholder="second_phone"
                            />
                        </div>
                        <div className="AdoptStep2_notification">
                            <h5>
                                If your application is approved, could you let me know which day you would like the
                                volunteer to visit your home ?
                            </h5>
                            <p>Please choose a date 7-10 days from now. Thank you!</p>
                        </div>
                        {/* 3 nut o duoi */}
                        <div className="AdoptStep2_3input">
                            {/* 3 nut: date */}
                            <div className="AdoptStep2_3input_date">
                                <label htmlFor="yob">Date</label>
                                <input
                                    className="AdoptStep2-infoInput-bar"
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    // placeholder="yob"
                                />
                            </div>
                            {/* 3 nut: from */}
                            <div className="AdoptStep2_3input_from">
                                <label htmlFor="phone">From</label>
                                <input
                                    className="AdoptStep2-infoInput-bar"
                                    type="time"
                                    id="from"
                                    name="from"
                                    value={formData.from}
                                    onChange={handleChange}
                                    required
                                    // placeholder="phone"
                                />
                            </div>
                            {/* 3 nut to  */}
                            <div className="AdoptStep2_3input_to">
                                <label htmlFor="phone">to</label>
                                <input
                                    className="AdoptStep2-infoInput-bar"
                                    type="time"
                                    id="to"
                                    name="to"
                                    value={formData.to}
                                    onChange={handleChange}
                                    required
                                    // placeholder="phone"
                                />
                            </div>
                        </div>
                    </form>
                    <div className="AdoptStep2-button">
                        <Button className="btn-2" onClick={() => setStep((prevStep) => prevStep - 1)}>
                            Cancel
                        </Button>
                        <Button className="btn-1" onClick={handleNext}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdoptStep2Form;
