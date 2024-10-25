import React, { useEffect, useRef, useState } from 'react';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import TimelineProgress from '~/pages/Application/ApplicationComponents/TimelineProgress/TimelineProgress';
import './VolunteerIntroduce.scss';

const VolunteerIntroduce = ({ onButtonClick }) => {
    const targetRef_1 = useRef(null);
    const targetRef_2 = useRef(null);
    const targetRef_3 = useRef(null);

    const handleRemoveItem = () => {
        const keysToDelete = [
            'adoptionStep_2a773d0a-3b71-4e8f-a4cf-4c714c5fed01',
            'adoptionStep_2b9335f7-6b79-44cf-9028-9d84b0605036',
            'adoptionStep_59e32047-7ebf-44ed-8d2b-18bd1e165ba7',
            'adoptionStep_5df9e535-a8ba-4bdd-886e-b42ca6afd768',
            'adoptionStep_8d141d1f-8466-4d0c-a6f1-a165e730dcc2',
            'adoptionStep_9d229ff3-770f-4b78-87b6-4fbdce79f425',
            'adoptionStep_a01812d4-d17e-447a-99ab-6ec398c57f13',
        ];

        keysToDelete.forEach((key) => {
            localStorage.removeItem(key);
            console.log(`Item with key "${key}" has been removed from local storage.`);
        });
        console.log('application_id removed');
    };

    return (
        <div className="adoptIntro">
            <div className="volunteer_container">
                {/* Header cua container */}
                <div className="volunteer_container_header">
                    <h3>How It Works For Volunteer</h3>
                    <p>
                        For most people, rehoming a pet is a really difficult but necessary decision. We know you want
                        the best for them so we’re here to help. To make the rehoming process as straightforward and
                        safe as possible, here’s a guide to how it works.
                    </p>
                </div>
                {/* Doan 1 */}
                <div ref={targetRef_1} className="volunteer_container_firstPara">
                    <img className="volunteer_container_firstPara_image" alt="image" src={IMAGES.VolunteerIntro_1} />
                    <div className="volunteer_container_firstPara_content">
                        <h3>1. Target</h3>
                        <p>
                            Furry Friends Haven is always looking for new volunteers to strengthen our team! By joining
                            us, you'll have the opportunity to make a meaningful impact in the lives of animals in need
                            while connecting with a passionate community of fellow animal lovers. We offer both remote
                            and in-person opportunities that cater to a variety of skills and experiences.
                        </p>
                    </div>
                </div>
                {/* Doan 2 */}
                <div ref={targetRef_2} className="volunteer_container_secondPara">
                    <div className="volunteer_container_secondPara_content">
                        <h3>2. Reason</h3>
                        <p>
                            If you’re interested in creating positive change and helping animals find their forever
                            homes, please fill out a volunteer application today. Each applicant will collaborate with
                            our Volunteer Manager to find the best fit based on availability, skills, interests, and
                            time commitment.
                        </p>
                    </div>
                    <img className="volunteer_container_secondPara_image" alt="image" src={IMAGES.VolunteerIntro_2} />
                </div>
                {/* Doan 3 */}
                <div ref={targetRef_3} className="volunteer_container_thirdPara">
                    <img className="volunteer_container_thirdPara_image" alt="image" src={IMAGES.VolunteerIntro_3} />
                    <div className="volunteer_container_thirdPara_content">
                        <h3>3. Meet and Greet</h3>
                        <p>
                            Together, we can make a difference! We look forward to welcoming you to the Furry Friends
                            Haven team and sharing this rewarding journey with you!
                        </p>
                    </div>
                </div>
                {/* Nút start process để chuyển qua find a pet */}
                <div className="volunteer_container_button">
                    <Button
                        adoptIntroduceButton
                        // onClick={() => setStep((prevStep) => prevStep + 1)}
                        onClick={onButtonClick}
                    >
                        Start The Process
                    </Button>
                    {/* <Button onClick={handleRemoveItem}>xoa</Button> */}
                </div>
            </div>
        </div>
    );
};

export default VolunteerIntroduce;
