import React from 'react';
import Button from '~/components/Button';
import IMAGES from '~/assets/images';
import './IntroducePage.scss';

function IntroducePage() {
    return (
        <div className="adoptIntro">
            <div className="adopt-container">
                {/* Header cua container */}
                <div className="adopt-container-header">
                    <h3>How It Works For Adopters</h3>
                    <p>
                        For most people, rehoming a pet is a really difficult but necessary decision. We know you want
                        the best for them so we’re here to help. To make the rehoming process as straightforward and
                        safe as possible, here’s a guide to how it works.
                    </p>
                </div>
                {/* Doan 1 */}
                <div className="adopt-container-firstPara">
                    <img className="adopt-container-firstPara-image" alt="image" src={IMAGES.adopt_introduce_1} />
                    <div className="adopt-container-firstPara-content">
                        <h3>1. Research and Preparation</h3>
                        <p>
                            Ready to welcome a furry friend into your home? Creating an adoption application is the
                            first step. Simply:
                        </p>
                        <ul class="adopt-container-firstPara-content-list">
                            <li>
                                Assess your lifestyle, living space, and personal preferences to determine whether you
                                want a dog, cat, or another type of pet
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Doan 2 */}
                <div className="adopt-container-secondPara">
                    <div className="adopt-container-secondPara-content">
                        <h3>2. Application</h3>
                        <ul class="adopt-container-secondPara-content-list">
                            <li class="custom-bullet">Submit an application:</li>
                            <ul>
                                <li>It could be your living situation</li>
                                <li>Experience with pets</li>
                                <li>Why you want to adopt</li>
                            </ul>
                            <li>Application review:</li>
                            <li>
                                The shelter will review your application to ensure that the pet is a good match for your
                                household and that you can meet the pet’s needs.
                            </li>
                        </ul>
                    </div>
                    <img className="adopt-container-secondPara-image" alt="image" src={IMAGES.adopt_introduce_2} />
                </div>
                {/* Doan 3 */}
                <div className="adopt-container-thirdPara">
                    <img className="adopt-container-thirdPara-image" alt="image" src={IMAGES.adopt_introduce_3} />
                    <div className="adopt-container-thirdPara-content">
                        <h3>3. Meet and Greet</h3>
                        <ul class="adopt-container-thirdPara-content-list">
                            <li>
                                Meet the Pet : Once your application is approved, you will have the opportunity to meet
                                the pet
                            </li>
                            <li>
                                Interaction with Other Pets:If you have existing pets, a meeting may be necessary to see
                                how they interact with the potential new pet to ensure compatibility.
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Doan 4 */}
                <div className="adopt-container-fourthPara">
                    <div className="adopt-container-fourthPara-content">
                        <h3>4. Home Visit (optional)</h3>
                        <ul class="adopt-container-fourthPara-content-list">
                            <li>
                                Some shelters or rescue groups may conduct a home visit to ensure the environment is
                                safe and suitable for the pet, especially for certain breeds or species with special
                                needs.
                            </li>
                        </ul>
                    </div>
                    <img className="adopt-container-fourthPara-image" alt="image" src={IMAGES.adopt_introduce_4} />
                </div>
                {/* Doan 5 */}
                <div className="adopt-container-fifthPara">
                    <img className="adopt-container-fifthPara-image" alt="image" src={IMAGES.adopt_introduce_5} />
                    <div className="adopt-container-fifthPara-content">
                        <h3>5. Finalizing the Adoption</h3>
                        <ul class="adopt-container-fifthPara-content-list">
                            <li>
                                Sign adoption papers: You'll sign a contract committing to the care of the pet. It
                                usually includes terms such as returning the pet to the organization if things don’t
                                work out.
                            </li>
                            <li>
                                Take the pet home: After completing the paperwork and paying any necessary fees, you can
                                bring your new pet home.
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Doan 6 */}
                <div className="adopt-container-sixthPara">
                    <div className="adopt-container-sixthPara-content">
                        <h3>6. Post-Adoption Support</h3>
                        <ul class="adopt-container-sixthPara-content-list">
                            <li>
                                Adjusting the Pet to Your Home: Allow your pet time to adjust to the new environment. Be
                                patient, as they may need time to settle in and feel comfortable.
                            </li>
                            <li>
                                Follow-Up Visits: Some shelters may conduct follow-up calls or visits to check on the
                                pet’s well-being and ensure that the adoption is successful.
                            </li>
                        </ul>
                    </div>
                    <img className="adopt-container-sixthPara-image" alt="image" src={IMAGES.adopt_introduce_6} />
                </div>
                {/* Nút start process để chuyển qua find a pet */}
                <div className="adopt-container-button">
                    <Button adoptIntroduceButton to="/find-a-pet">
                        Start The Process
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default IntroducePage;
