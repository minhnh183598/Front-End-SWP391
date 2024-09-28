import React, { useState } from 'react';
import IntroducePage from './AdoptComponents/IntroducePage';
// import AdoptStep1 from './AdoptComponents/AdoptStep1';
// import AdoptStep2 from './rehomeComponents/AdoptStep2';
// import AdoptStep3 from './rehomeComponents/AdoptStep3';
// import AdoptStep4 from './rehomeComponents/AdoptStep4';
// import AdoptStep5 from './rehomeComponents/AdoptStep5';

function Rehome() {
    const [step, setStep] = useState(0);
    const goNext = () => {
        return step === setStep + 1;
    };
    const goBack = () => {
        return step === setStep - 1;
    };
    return (
        <div>
            {step === 0 && <IntroducePage />}
            {/* {step === 1 && <AdoptStep1 />} */}
            {/* {step === 2 && <AdoptStep2 />}
            {step === 3 && <AdoptStep3 />}
            {step === 4 && <AdoptStep4 />}
            {step === 5 && <AdoptStep5 />} */}
        </div>
    );
}

export default Rehome;
