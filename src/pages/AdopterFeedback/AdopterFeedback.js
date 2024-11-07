import classNames from 'classnames/bind';
import styles from './AdopterFeedback.module.scss';
import React, { useState } from 'react';
import api from '~/config/axios';
import { Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '~/utils/Upload';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdopterFeedback() {
    const { id } = useParams();
    const [starHover, setStarHover] = useState({});
    const [openHomeCheck, setOpenHomeCheck] = useState(false);
    const [formData, setFormData] = useState({
        content: '',
        images: [],
        rating: {
            livingSpace: '',
            familyIncome: '',
            petExperience: '',
            familyStability: '',
            timeCommitment: '',
        },
    });

    //image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleFileChange = ({ fileList: newFileList }) => {
        if (newFileList.length <= 5) {
            setFileList(newFileList);
        } else {
            alert('You can only upload a maximum of 5 images.');
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    // end image

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.rating) {
            setFormData((prevData) => ({
                ...prevData,
                rating: {
                    ...prevData.rating,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleStarClick = (field, star) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: star,
        }));
    };

    const handleUpdateTaskStatusUndertake = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.put(`tasks/taskID/status/DONE`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('update after undertake', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateFeedback = async (e) => {
        e.preventDefault();

        if (fileList.length < 3) {
            alert('You must upload at least 3 images.');
            return;
        }

        const uploadedUrls = await Promise.all(
            fileList.map(async (file) => {
                if (file.originFileObj) {
                    const url = await uploadFile(file.originFileObj);
                    console.log('Uploaded URL:', url);
                    return url;
                }
                return null;
            }),
        );

        const validUrls = uploadedUrls.filter(Boolean);

        const updatedData = {
            content: formData.content,
            images: validUrls,
            rating: formData.rating,
        };
        console.log('update form data', updatedData);

        const token = localStorage.getItem('token');

        try {
            const response = await api.post(`feedbacks/task/taskID`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('send homecheck', response.data);
            await handleUpdateTaskStatusUndertake();
            setOpenHomeCheck(false);
            toast.success('Send homecheck successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const formatLabel = (string) => {
        return string.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('wrapper-form')}>
                <p className={cx('title')}>
                    <b>Adopter Feedback for Minhhhh</b>
                </p>
                <form onSubmit={handleCreateFeedback}>
                    <div className={cx('home-check-input-wrap')}>
                        <div className={cx('form-rating')}>
                            {[
                                'How would you rate the pet’s health?',
                                'Is the pet happy and friendly?',
                                'Any challenges in caring for the pet?',
                                'Has the pet brought joy to your life?',
                                'Has the pet adapted well to the new home?',
                                'How likely are you to recommend adoption?',
                            ].map((field) => (
                                <div className={cx('living-item')} key={field}>
                                    <label htmlFor={field}>
                                        <b>{formatLabel(field)}</b>
                                    </label>
                                    <div className={cx('stars')}>
                                        {[...Array(5)].map((star, index) => {
                                            const currentRating = index + 1;
                                            return (
                                                <label key={index}>
                                                    <input
                                                        type="radio"
                                                        name={field}
                                                        value={currentRating}
                                                        onChange={() => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                rating: {
                                                                    ...prevData.rating,
                                                                    [field]: currentRating,
                                                                },
                                                            }));
                                                        }}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        className={cx('star-icon')}
                                                        color={
                                                            currentRating <=
                                                            (starHover[field] || formData.rating[field])
                                                                ? 'gold'
                                                                : 'grey'
                                                        }
                                                        onMouseEnter={() =>
                                                            setStarHover((prev) => ({
                                                                ...prev,
                                                                [field]: currentRating,
                                                            }))
                                                        }
                                                        onMouseLeave={() =>
                                                            setStarHover((prev) => ({ ...prev, [field]: null }))
                                                        }
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={cx('home-check-right')}>
                            <div className={cx('form-input')}>
                                <label htmlFor="content">
                                    <b>How satisfied are you with the adoption? Let us know more!</b>
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className={cx('form-image')}>
                                <div className={cx('upload-image')}>
                                    <label htmlFor="images">
                                        <b>Images</b> (3-5 images)
                                    </label>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleFileChange}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Button mgRight10 primary medium type="submit">
                            Submit
                        </Button>
                        <Button
                            outline
                            medium
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenHomeCheck(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>

                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </div>
        </div>
    );
}

export default AdopterFeedback;
