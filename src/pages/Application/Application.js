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

const Application = () => {
    const max_step = 5;
    const { id } = useParams();
    // const [step, setStep] = useState(() => {
    //     const savedStep = localStorage.getItem(`adoptionStep_${id}`);
    //     return savedStep ? Math.min(parseInt(savedStep, 10), max_step) : 0;
    // });

    const [step, setStep] = useState(0);
    useEffect(() => {
        localStorage.setItem(`adoptionStep_${id}`, step.toString());
    }, [step, id]);

    const renderStep = () => {
        switch (step) {
            case 0:
                return <IntroducePage setStep={setStep} />;
            case 1:
                return <AdoptStep1 id={id} setStep={setStep} />;
            case 2:
                return <AdoptStep2 setStep={setStep} />;
            case 3:
                return <AdoptStep3 id={id} setStep={setStep} />;
            case 4:
                return <AdoptStep4 id={id} setStep={setStep} />;
            case 5:
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

                            <div className={`line_3 ${step >= 3 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_3 ${step >= 3 ? 'selected' : ''}`}>3</div>

                            <div className={`line_4 ${step >= 4 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_4 ${step >= 4 ? 'selected' : ''}`}>4</div>

                            <div className={`line_5 ${step >= 5 ? 'selected' : ''}`}></div>

                            <div className={`stepCir_5 ${step >= 5 ? 'selected' : ''}`}>5</div>
                        </div>
                    </div>
                </div>
            )}
            {renderStep()}
        </div>
    );
};

export default Application;
