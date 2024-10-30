import React, { useEffect, useState } from 'react';
import api from '~/config/axios';
import './DonateHistory.scss';
import { Pagination } from 'antd';

const DonateHistory = () => {
    const [donateData, setDonateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDonate, setTotalDonate] = useState([]);
    const donatePerPage = 10;
    let step = 1;

    const reversedDonateData = [...donateData].reverse();

    const getDonation = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await api.get(`payment/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTotalDonate(response.data);
            setDonateData(response.data.donations);
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái:', error);
        }
    };
    console.log('Day la donate data', donateData);
    console.log('Day la total donate', totalDonate);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getDonation();
    }, []);

    const indexOfLastPet = currentPage * donatePerPage;
    const indexOfFirstPet = indexOfLastPet - donatePerPage;
    const currentDonate = reversedDonateData.slice(indexOfFirstPet, indexOfLastPet);

    return (
        <div className="donateHis">
            <div className="total_donation">
                <p>
                    <strong>Total Donate: </strong>
                    {totalDonate.totalAmount} VND
                </p>
            </div>
            <div className="donateHis_header">
                <p>ID</p>
                <p>Amount</p>
                <p>Bank</p>
                <p>Card Type</p>
                <p>Date</p>
                {/* <p>Donate For</p> */}
                {/* <p>Action</p> */}
            </div>
            <div className="donateHis_box">
                {currentDonate.map((don, index) => (
                    <div className="donateHis_box_each">
                        <p className="donateHis_box_each_id">{index + 1}</p>
                        <p className="donateHis_box_each_amount">{don.amount}</p>
                        <p className="donateHis_box_each_bank">{don.bankCode}</p>
                        <p className="donateHis_box_each_card">{don.cardType}</p>
                        <p className="donateHis_box_each_date">{don.payDate}</p>
                        {/* <p className="donateHis_box_each_info">{don.orderInfo}</p> */}
                        {/* <a className="donateHis_box_each_action" href="/my-donation-details">
                            View Details
                        </a> */}
                    </div>
                ))}
                <div className="showAllPet_pagination">
                    <Pagination
                        current={currentPage}
                        pageSize={donatePerPage}
                        total={donateData.length}
                        onChange={onChangePage}
                        showSizeChanger={false} // Ẩn nút thay đổi số lượng hiển thị
                    />
                </div>
            </div>
        </div>
    );
};

export default DonateHistory;
