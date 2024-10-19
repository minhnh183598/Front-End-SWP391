import React, { useEffect, useState } from 'react';
import Button from '~/components/Button';
import api from '~/config/axios';

const AdoptStep4Waiting = ({ setStep }) => {
    const [statusMessage, setStatusMessage] = useState('Đang chờ admin duyệt...');

    useEffect(() => {
        const interval = setInterval(() => {
            checkApprovalStatus();
        }, 5000); // Kiểm tra mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, []);

    const checkApprovalStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const applicationId = localStorage.getItem('applicationId');
            const response = await api.get(`applications/${applicationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { status } = response.data;
            // console.log('Day la response', response);
            // console.log('Day la Status', status);
            if (status === 3) {
                setStatusMessage('Đơn của bạn đã được duyệt!');
                setStep(7); // Chuyển sang bước tiếp theo
            } else if (status === 4) {
                setStatusMessage('Đơn của bạn đã bị từ chối.');
                setStep(0); // Quay về bước đầu
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    return (
        <div>
            AdoptStep4Waiting
            <div className="AdoptStep3-button">
                <Button className="btn-1" onClick={() => setStep((prevStep) => prevStep + 1)}>
                    Yes
                </Button>
                <Button onClick={() => setStep((prevStep) => prevStep - 1)} className="btn-2">
                    No
                </Button>
            </div>
        </div>
    );
};

export default AdoptStep4Waiting;
