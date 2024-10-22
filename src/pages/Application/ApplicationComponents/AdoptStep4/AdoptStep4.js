import React, { useEffect, useState } from 'react';
import './AdoptStep4.scss';
import Button from '~/components/Button';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const AdoptStep4 = ({ id, setStep }) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    const handlePetData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`pets/${id}`, {
                headers: {
                    Authorization: 'No Auth',
                },
            });
            setPet(response.data);
            localStorage.setItem('petuData', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hoàn tất quá trình tải
        }
    };
    // console.log(pet);

    useEffect(() => {
        handlePetData();
    }, []);
    return (
        <div className="AdoptStep4">
            <ScrollToTop />
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : pet ? (
                <>
                    <div className="AdopStep4-board">
                        <div className="AdoptStep4-first2-wrap">
                            <div className="AdoptStep4-first2">
                                <div className="meet_greet">Home Visit</div>
                                <div className="your-profile">
                                    Our team will schedule a home visit (if needed) to ensure a suitable environment for{' '}
                                    {pet.petName}. We will arrange a time with you soon.
                                </div>
                            </div>
                        </div>

                        <div className="AdoptStep4-button">
                            <Button onClick={() => setStep((prevStep) => prevStep + 1)} className="btn-2">
                                Deny
                            </Button>
                            <Button className="btn-1" onClick={() => setStep((prevStep) => prevStep + 1)}>
                                Agree
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Pet data not available</p> // Hiển thị nếu không có dữ liệu
            )}
        </div>
    );
};

export default AdoptStep4;
