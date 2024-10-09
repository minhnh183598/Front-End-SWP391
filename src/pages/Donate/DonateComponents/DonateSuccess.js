import React from 'react';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import './DonateSuccess.scss';

const DonateSuccess = () => {
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
                    <Button>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default DonateSuccess;
