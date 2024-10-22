import React, { useEffect, useState } from 'react';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import './DonateSuccess.scss';
import api from '~/config/axios';

const DonateSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [isSaved, setIsSaved] = useState(false); // Trạng thái lưu thông tin

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const paymentData = {
            amount: params.get('vnp_Amount'),
            bankCode: params.get('vnp_BankCode'),
            bankTranNo: params.get('vnp_BankTranNo'),
            cardType: params.get('vnp_CardType'),
            orderInfo: params.get('vnp_OrderInfo'),
            payDate: params.get('vnp_PayDate'),
            responseCode: params.get('vnp_ResponseCode'),
            transactionNo: params.get('vnp_TransactionNo'),
            transactionStatus: params.get('vnp_TransactionStatus'),
            txnRef: params.get('vnp_TxnRef'),
        };

        setPaymentInfo(paymentData);

        // Gửi thông tin về backend để lưu vào cơ sở dữ liệu
        savePaymentData(paymentData);
    }, []);
    console.log(paymentInfo);
    const savePaymentData = async (data) => {
        try {
            const response = await api.post('/thanks', data);
            if (response.status === 200) {
                setIsSaved(true); // Đánh dấu thông tin đã được lưu thành công
            }
        } catch (error) {
            console.error('Lỗi khi lưu thông tin thanh toán:', error);
        }
    };

    return (
        <div className="donate_success">
            <div className="donate_success_container">
                <div className="donate_success_container_header"></div>
                <img alt="image" src={IMAGES.greenTick} />
                <div className="donate_success_container_content">
                    <h3 className="donate_success_container_success">Success</h3>
                    <h3 className="donate_success_container_thank">Thank You for Saving a Life!</h3>
                    <p className="donate_success_container_yourDonation">
                        Your donation will help feed and care for abandoned pets.
                    </p>
                </div>
                <div className="donate_success_container_button">
                    <Button className="donate_success_container_button_btn" to="/">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DonateSuccess;
