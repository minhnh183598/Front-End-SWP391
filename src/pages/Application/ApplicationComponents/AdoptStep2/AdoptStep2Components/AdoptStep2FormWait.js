import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import api from '~/config/axios';
import './AdoptStep2FormWait.scss';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import IMAGES from '~/assets/images';

const AdoptStep2FormWait = ({ setStep }) => {
    const [statusMessage, setStatusMessage] = useState('Đang chờ admin duyệt...');
    const [appliData, setAppliData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log('Day la applidata id: ', appliData.applicationId);
    const checkApprovalStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const applicationId = localStorage.getItem('applicationId');
            const response = await api.get(`applications/${applicationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppliData(response.data);
            const { status } = response.data;
            if (status === 1) {
                setStatusMessage('Đơn của bạn đã được duyệt!');
                setStep(4);
            } else if (status === 2) {
                setStatusMessage('Đơn của bạn đã bị từ chối.');
                setStep(0);
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            checkApprovalStatus();
        }, 500); // 1-second delay

        return () => clearTimeout(timer);
    }, []);

    const handleUpdate = () => {
        navigate(`/my-application-update/${appliData.applicationId}`);
    };

    const notify = () => {
        toast.error('You cannot update once your application has been checked');
    };

    return (
        <div className="applicationDetail">
            <ToastContainer />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="adoptstep2wait_box">
                    <ScrollToTop />

                    <p className="adoptstep2wait_box_header">
                        Your application has been submitted. Please wait for us to approve your application. Now let's
                        check the information again!
                    </p>
                    <div className="adoptstep2wait_box_content">
                        <div className="applicationDetail_box_content_name_phone">
                            <p>
                                <strong>Full Name: </strong>
                                {appliData.fullName}
                            </p>
                            <p>
                                <strong>Phone Number: </strong>
                                {appliData.phone}
                            </p>
                        </div>
                        <div className="adoptStep2_box_content_yob_gender">
                            <p className="adoptStep2_gender">
                                <strong>Gender: </strong>
                                {appliData.gender}
                            </p>
                            <p>
                                <strong>Year of Birth: </strong>
                                {appliData.yob}
                            </p>
                        </div>
                        <p>
                            <strong>Address: </strong>
                            {appliData.address}
                        </p>
                        <p>
                            <strong>City: </strong>
                            {appliData.city}
                        </p>
                        <p>
                            <strong>Job: </strong>
                            {appliData.job}
                        </p>
                        <p>
                            <strong>Who do you live with?: </strong>
                            {appliData.liveWith}
                        </p>
                        <p>
                            <strong>Reference Person #1: </strong>
                            {appliData.firstPerson}
                        </p>
                        <p>
                            <strong>Phone Number #1: </strong>
                            {appliData.firstPhone}
                        </p>
                        <p>
                            <strong>Reference Person #2: </strong>
                            {appliData.secondPerson}
                        </p>
                        <p>
                            <strong>Phone Number #2: </strong>
                            {appliData.secondPhone}
                        </p>
                    </div>
                    <div className="applicationDetail_box_btn_wrap">
                        {appliData.status === 0 ? (
                            <div className="applicationDetail_box_btn">
                                <Button onClick={handleUpdate}>Update</Button> {/* Add a label or text here */}
                            </div>
                        ) : (
                            <div className="applicationDetail_box_btn">
                                <Button onClick={notify}>Update</Button> {/* Add a label or text here */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdoptStep2FormWait;
