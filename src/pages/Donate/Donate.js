import React, { useState } from 'react';
import './Donate.scss';
import IMAGES from '~/assets/images';
import Button from '~/components/Button';
import Form from 'react-bootstrap/Form';
import { DefaultLayout } from '~/components/Layout';

export const Donate = () => {
    const [paymentMethod, setPaymentMethod] = useState(''); // Trạng thái lưu phương thức thanh toán được chọn
    const [step, setStep] = useState(1); // Biến này dùng để lưu giá trị step
    const [selectedAmount, setSelectedAmount] = useState(''); // Biến trạng thái này lưu giá trị số tiền quy định mà người dùng chọn
    const [customAmount, setCustomAmount] = useState(''); // Biến trạng thái này lưu giá trị số tiền mà người dùng tự nhập vào khi không chọn số tiền có sẵn.
    const amounts = [50000, 100000, 500000, 1000000]; // Các số tiền quy định sẵn
    const [cardInfo, setCardInfo] = useState({
        // Biến này lưu thông tin thẻ
        cardNumber: '',
        expiryDate: '',
        cvc: '',
    });
    const [addressInfo, setAddressInfo] = useState({
        // Biến này lưu thông tin địa chỉ
        address: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
    });
    const [agreed, setAgreed] = useState(false); // Biến này lưu thông tin đồng ý điều khoảng

    // Xử lý chọn phương thức thanh toán
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };
    // functions step 1
    // Hàm này xử lý giá tiền chọn của 4 nút bước 1
    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount); // Đặt số tiền quy định đã chọn
        setCustomAmount(''); // Xóa số tiền tự nhập khi chọn số tiền quy định
    };

    // Hàm này xử lý giá tiền tự nhập
    const handleCustomAmountChange = (e) => {
        setSelectedAmount(null); // Bỏ chọn số tiền quy định khi người dùng nhập số tiền khác
        setCustomAmount(e.target.value); // Cập nhật số tiền tự nhập
    };

    // function step 2
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardInfo({ ...cardInfo, [name]: value });
    };

    // Xử lý nhập thông tin địa chỉ
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
    };

    // Xử lý checkbox điều khoản
    const handleAgreementChange = () => {
        setAgreed(!agreed);
    };

    // Function của các thể loại nút
    const handleSubmit = () => {
        // if (selectedAmount > 0 || customAmount >= 10000) {
        //     //Trường hợp nhập tiền và có method thì cho qua step 2
        //     if (paymentMethod === 'qr' || paymentMethod === 'visa') {
        //         setStep(step + 1);
        //         //Trường hợp nhập tiền nhưng ko có method thì alert
        //     } else {
        //         alert(`You need to choose payment method`);
        //     }
        // } else {
        //     //Trường hợp ko nhập tiền nhưng có method
        //     if (paymentMethod === 'qr' || paymentMethod === 'visa') {
        //         alert(`You need to choose payment amount`);
        //         //Trường hợp ko nhập tiền và ko nhập method
        //     } else {
        //         alert(`You need to choose payment amount and method`);
        //     }
        // }
    };

    const goBack = () => {
        setStep(step - 1);
    };

    return (
        <div className="donation-container">
            {/* Buoc 1 */}
            {step === 1 && (
                <div className="step-1">
                    <h3 className="donation">DONATION</h3>
                    <div className="donation-options">
                        <img className="image" alt="image" src={IMAGES.donatepic} />
                        <div className="donate-content">
                            <div className="select-amount">
                                <h3>Select the amount of aid</h3>
                                <p>All plans are in VND</p>
                            </div>

                            {/* Thanh qua trinh donate */}
                            <div className="step-display">
                                <div className="stepProg-1"></div>
                                <div className="stepProg-2"></div>
                                <div className="stepProg-3"></div>
                            </div>
                            {/* chon gia tien donate  */}
                            <div className="amount-buttons">
                                <div className="button-display">
                                    {amounts.map((amount) => (
                                        <Button
                                            donateButton
                                            large
                                            key={amount}
                                            className={`donate-button ${selectedAmount === amount ? 'selected' : ''}`}
                                            onClick={() => handleAmountSelect(amount)}
                                        >
                                            {amount.toLocaleString('vi-VN')} VND
                                        </Button>
                                    ))}
                                </div>
                                {/* thanh input another amount  */}
                                <div className="input-save">
                                    <Form.Control
                                        type="number"
                                        placeholder="Another Amount"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                    />
                                </div>
                                {/* <h3>Payment Method</h3>
                                <div className="payment-method-buttons">
                                    <button
                                        donateButton
                                        onClick={() => handlePaymentMethodChange('visa')}
                                        className={`choose-method-button ${paymentMethod === 'visa' ? 'active' : ''}`}
                                    >
                                        <img className="visa-image" alt="image" src={IMAGES.donateVisa} />
                                      
                                    </button>

                                    <button
                                       
                                        onClick={() => handlePaymentMethodChange('qr')}
                                        className={`choose-method-button ${paymentMethod === 'qr' ? 'active' : ''}`}
                                    >
                                        <img className="qr-image" alt="image" src={IMAGES.donateQR} />
                                        
                                    </button>
                                </div> */}

                                {/* nut save  */}
                                <button className="save-button" onClick={handleSubmit}>
                                    SAVE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Buoc 2 */}
            {step === 2 && (
                // Khối div bao bọc cả step 2 bao gồm cả visa và QR
                <div className="step-2">
                    <h3 className="donation">DONATION</h3>
                    {/* Chuyển hướng qua trang visa */}
                    {paymentMethod === 'visa' && (
                        <div className="visa-option-container">
                            {/* Bắt đầu cái khung */}
                            <div className="donation-options">
                                {/* Hình ảnh bên phải */}
                                <img className="image" alt="image" src={IMAGES.donatepic} />

                                {/* Khối div bao quanh toàn bộ phần thông tin bên trái */}
                                <div className="step-2-content">
                                    {/* header phần thông tin */}
                                    <div className="step-2-option-header">
                                        <p className="you-want-to">You Want To Donate</p>
                                        {customAmount >= 10000 ? (
                                            <p className="header-amount">{customAmount.toLocaleString('vi-VN')} VND</p>
                                        ) : (
                                            <p className="header-amount">
                                                {selectedAmount.toLocaleString('vi-VN')} VND
                                            </p>
                                        )}
                                    </div>

                                    {/* thanh hiển thị step */}
                                    <div className="step-display-step-2-visa">
                                        <div className="stepProg-1"></div>
                                        <div className="stepProg-2"></div>
                                        <div className="stepProg-3"></div>
                                    </div>
                                    {/* Bắt đầu form */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="step-indicator">
                                            <div className="step active"></div>
                                            <div className="step"></div>
                                            <div className="step"></div>
                                        </div>
                                        <h3>Choose Your Payment Method</h3>
                                        {/* Ô điền thông tin thẻ */}
                                        <div className="card-details">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Credit or debit card"
                                                value={cardInfo.cardNumber}
                                                onChange={handleCardChange}
                                            />
                                            <div className="card-row">
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    placeholder="MM / YY"
                                                    value={cardInfo.expiryDate}
                                                    onChange={handleCardChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    value={cardInfo.cvc}
                                                    onChange={handleCardChange}
                                                />
                                            </div>
                                        </div>
                                        {/* Điền địa chỉ */}
                                        <h3>Primary address</h3>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={addressInfo.address}
                                            onChange={handleAddressChange}
                                        />
                                        <div className="address-row">
                                            <select
                                                name="country"
                                                value={addressInfo.country}
                                                onChange={handleAddressChange}
                                            >
                                                <option value="">Select</option>
                                                <option value="Vietnam">Vietnam</option>
                                                <option value="USA">USA</option>
                                                {/* Add more countries as needed */}
                                            </select>
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                value={addressInfo.state}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div className="address-row">
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                value={addressInfo.city}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="zipcode"
                                                placeholder="Zipcode"
                                                value={addressInfo.zipcode}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        {/* Ô xác nhận không phải là người máy */}
                                        <div className="recaptcha">
                                            <input type="checkbox" />
                                            <span>I'm not a robot</span>
                                        </div>
                                        {/* Ô xác nhận đồng ý terms và policy */}
                                        <div className="terms">
                                            <input type="checkbox" checked={agreed} onChange={handleAgreementChange} />
                                            <label>
                                                I accept the <a href="#terms">Terms and Conditions</a>
                                            </label>
                                        </div>
                                        {/* Nút donate và back */}
                                        <div className="buttons">
                                            <button type="button" className="back-button" onClick={goBack}>
                                                Back
                                            </button>
                                            <button type="submit" className="donate-button">
                                                Donate
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Chuyển hướng qua trang QR */}
                    {paymentMethod === 'qr' && (
                        <div className="visa-option-container">
                            {/* Bắt đầu cái khung */}
                            <div className="donation-options">
                                {/* Hình ảnh bên phải */}
                                <img className="image" alt="image" src={IMAGES.donatepic} />

                                {/* Khối div bao quanh toàn bộ phần thông tin bên trái */}
                                <div className="step-2-content">
                                    {/* header phần thông tin */}
                                    <p className="you-want-to">You Want To Donate</p>
                                    {customAmount >= 10000 ? (
                                        <p className="header-amount">{customAmount.toLocaleString('vi-VN')}VND</p>
                                    ) : (
                                        <p className="header-amount">{selectedAmount.toLocaleString('vi-VN')}VND</p>
                                    )}

                                    {/* thanh hiển thị step */}
                                    <div className="step-display">
                                        <div className="stepProg-1"></div>
                                        <div className="stepProg-2"></div>
                                        <div className="stepProg-3"></div>
                                    </div>
                                    {/* Bắt đầu form */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="step-indicator">
                                            <div className="step active"></div>
                                            <div className="step"></div>
                                            <div className="step"></div>
                                        </div>
                                        <h3>Choose Your Payment Method</h3>
                                        {/* Chọn phương thức thanh toán */}
                                        <Form.Select aria-label="Default select example">
                                            <option value="1">Visa</option>
                                            <option value="2">QR Code</option>
                                        </Form.Select>
                                        {/* Ô điền thông tin thẻ */}
                                        <div className="card-details">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Credit or debit card"
                                                value={cardInfo.cardNumber}
                                                onChange={handleCardChange}
                                            />
                                            <div className="card-row">
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    placeholder="MM / YY"
                                                    value={cardInfo.expiryDate}
                                                    onChange={handleCardChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    value={cardInfo.cvc}
                                                    onChange={handleCardChange}
                                                />
                                            </div>
                                        </div>
                                        {/* Điền địa chỉ */}
                                        <h3>Primary address</h3>
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={addressInfo.address}
                                            onChange={handleAddressChange}
                                        />
                                        <div className="address-row">
                                            <select
                                                name="country"
                                                value={addressInfo.country}
                                                onChange={handleAddressChange}
                                            >
                                                <option value="">Select</option>
                                                <option value="Vietnam">Vietnam</option>
                                                <option value="USA">USA</option>
                                                {/* Add more countries as needed */}
                                            </select>
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                value={addressInfo.state}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        <div className="address-row">
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                value={addressInfo.city}
                                                onChange={handleAddressChange}
                                            />
                                            <input
                                                type="text"
                                                name="zipcode"
                                                placeholder="Zipcode"
                                                value={addressInfo.zipcode}
                                                onChange={handleAddressChange}
                                            />
                                        </div>
                                        {/* Ô xác nhận không phải là người máy */}
                                        <div className="recaptcha">
                                            <input type="checkbox" />
                                            <span>I'm not a robot</span>
                                        </div>
                                        {/* Ô xác nhận đồng ý terms và policy */}
                                        <div className="terms">
                                            <input type="checkbox" checked={agreed} onChange={handleAgreementChange} />
                                            <label>
                                                I accept the <a href="#terms">Terms and Conditions</a>
                                            </label>
                                        </div>
                                        {/* Nút donate và back */}
                                        <div className="buttons">
                                            <button type="button" className="back-button" onClick={goBack}>
                                                Back
                                            </button>
                                            <button type="submit" className="donate-button">
                                                Donate
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <br />
            {/* Buoc 3  */}
            {step === 3 && <div></div>}
            {/* phan text o duoi bang donate  */}
            <div className="text-wrap">
                <div className="text-wrap-1">
                    <h3 className="what-is-included">What is included in your donation?</h3>
                    <p className="text-1">
                        Taking care of a big pack has a lot of challenges. We have a big tribe of people who help us get
                        our dogs neutered, fed, cleaned and loved every single day. Each dog has a cost around $36 per
                        month. This includes veterinary care, food costs and maintenance to our shelter.
                    </p>
                </div>

                <div className="text-wrap-2">
                    <div className="text-wrap-3">
                        <h3 className="veterinary">Veterinary care</h3>
                        <p className="text-2">
                            We neuter and deworm every new dog we receive in our shelter. There are some extreme cases
                            that take a lot of resources with surgeries, amputations and other major operations; but on
                            average each healthy dog we have costs us around $25 yearly for basic medication and
                            veterinary care.
                        </p>
                    </div>
                    <div className="text-wrap-4">
                        <h3 className="shelter">Shelter/Farm</h3>
                        <p className="text-3">
                            We neuter and deworm every new dog we receive in our shelter. There are some extreme cases
                            that take a lot of resources with surgeries, amputations and other major operations; but on
                            average each healthy dog we have costs us around $25 yearly for basic medication and
                            veterinary care.
                        </p>
                    </div>
                    <div className="text-wrap-5">
                        <h3 className="food-cost">Food Costs</h3>
                        <p className="text-4">
                            We neuter and deworm every new dog we receive in our shelter. There are some extreme cases
                            that take a lot of resources with surgeries, amputations and other major operations; but on
                            average each healthy dog we have costs us around $25 yearly for basic medication and
                            veterinary care.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
