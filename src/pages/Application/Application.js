import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Application.scss';
import IntroducePage from './ApplicationComponents/IntroducePage/IntroducePage';
import AdoptStep1 from './ApplicationComponents/AdoptStep1/AdoptStep1';
import AdoptStep2 from './ApplicationComponents/AdoptStep2/AdoptStep2';
import AdoptStep3 from './ApplicationComponents/AdoptStep3/AdoptStep3';
import AdoptStep4 from './ApplicationComponents/AdoptStep4/AdoptStep4';
import AdoptStep5 from './ApplicationComponents/AdoptStep5/AdoptStep5';
import { Step, Stepper } from 'react-form-stepper';
import AdoptStep2FormWait from './ApplicationComponents/AdoptStep2/AdoptStep2Components/AdoptStep2FormWait';
import AdoptStep4Waiting from './ApplicationComponents/AdoptStep4/AdoptStep4Components/AdoptStep4Waiting';

const Application = () => {
    const { id } = useParams();
    const max_step = 7;
    const userId = localStorage.getItem('userId');
    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem(`adoptionStep_${id}_${userId}`);
        return savedStep ? Math.min(parseInt(savedStep, 10), max_step) : 0;
    });
    console.log(userId);
    // const [step, setStep] = useState(0);

    // useEffect(() => {
    //     const savedStep = localStorage.getItem(`adoptionStep_${id}`);
    //     if (savedStep) {
    //         setStep(Math.min(parseInt(savedStep, 10), max_step));
    //     } else {
    //         setStep(0); // Khởi tạo lại step khi không có dữ liệu
    //     }
    // }, [id]); // Chỉ chạy lại khi id thay đổi

    useEffect(() => {
        localStorage.setItem(`adoptionStep_${id}_${userId}`, step.toString());
    }, [step, id]);

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <IntroducePage onButtonClick={handleNext} />;
            case 1:
                return <AdoptStep1 id={id} setStep={setStep} />;
            case 2:
                return <AdoptStep2 id={id} setStep={setStep} />;
            case 3:
                // return <AdoptStep3 id={id} setStep={setStep} />;
                return <AdoptStep2FormWait id={id} setStep={setStep} />;
            case 4:
                // return <AdoptStep4 id={id} setStep={setStep} />;
                return <AdoptStep3 id={id} setStep={setStep} />;
            case 5:
                // return <AdoptStep5 id={id} setStep={setStep} />;
                return <AdoptStep4 id={id} setStep={setStep} />;
            case 6:
                // return <AdoptStep5 id={id} setStep={setStep} />;
                return <AdoptStep4Waiting id={id} setStep={setStep} />;
            case 7:
                // return <AdoptStep5 id={id} setStep={setStep} />;
                return <AdoptStep5 id={id} setStep={setStep} />;
            default:
                return null;
        }
    };

    console.log(step);

    return (
        <div>
            {/* Thanh processBar */}
            {step !== 0 && (
                <div className="processBar-wrap">
                    <div className="Application_processBar">
                        <div className="Application_processBar_stepCircle">
                            <div className={`stepCir_1 ${step >= 1 ? 'selected' : ''}`}>1</div>

                            <div className={`line_2 ${step >= 2 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_2 ${step >= 2 ? 'selected' : ''}`}>2</div>

                            <div className={`line_3 ${step >= 4 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_3 ${step >= 4 ? 'selected' : ''}`}>3</div>

                            <div className={`line_4 ${step >= 5 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_4 ${step >= 5 ? 'selected' : ''}`}>4</div>

                            <div className={`line_5 ${step >= 7 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_5 ${step >= 7 ? 'selected' : ''}`}>5</div>
                        </div>
                    </div>
                </div>
            )}
            {renderStep()}
        </div>
    );
};

export default Application;
