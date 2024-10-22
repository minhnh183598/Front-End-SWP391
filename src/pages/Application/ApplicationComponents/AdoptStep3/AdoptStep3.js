import React, { useEffect, useState } from 'react';
import './AdoptStep3.scss';
import Button from '~/components/Button';
import api from '~/config/axios';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';

const AdoptStep3 = ({ id, setStep }) => {
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
        <div className="AdoptStep3">
            <ScrollToTop />
            {loading ? (
                <p>Loading pet information...</p> // Hiển thị khi đang tải
            ) : pet ? (
                <>
                    <div className="AdopStep3-board">
                        <div className="AdoptStep3-first2-wrap">
                            <div className="AdoptStep3-first2">
                                <div className="meet_greet">Meet & Greet</div>
                                <div className="your-profile">
                                    Your profile is valid and eligible to be adopted. Right now you can go to our center
                                    to see {pet.petName}
                                </div>
                            </div>
                        </div>
                        <div className="aftermeet">
                            After meeting {pet.petName} do you want to raise
                            {pet.petGender === 'Male' ? <> him</> : <> her</>} ?
                        </div>

                        <div className="AdoptStep3-button">
                            <Button onClick={() => setStep((prevStep) => prevStep - 1)} className="btn-2">
                                No
                            </Button>
                            <Button className="btn-1" onClick={() => setStep((prevStep) => prevStep + 1)}>
                                Yes
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

export default AdoptStep3;
