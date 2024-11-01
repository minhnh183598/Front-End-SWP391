import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '~/config/axios';
import { storage } from '~/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './CreateEvent.scss';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        nickname: '', // Add nickname to formData
        category: 'ADOPTION',
        tags: [],
        images: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditorChange = (content) => {
        setFormData((prevData) => ({
            ...prevData,
            content: content,
        }));
    };

    const handleTagsChange = (e) => {
        const tagsArray = e.target.value.split(',').map((tag) => ({ name: tag.trim() }));
        setFormData((prevData) => ({
            ...prevData,
            tags: tagsArray,
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            images: files,
        }));
    };

    const uploadImagesToFirebase = async () => {
        const urls = await Promise.all(
            formData.images.map(async (image) => {
                const imageRef = ref(storage, `blogs/${image.name}`);
                await uploadBytes(imageRef, image);
                return getDownloadURL(imageRef);
            }),
        );
        return urls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error('You need to log in first');
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload images to Firebase and get URLs
            const imageUrls = await uploadImagesToFirebase();

            // Prepare JSON object to send
            const dataToSend = {
                title: formData.title,
                description: formData.description,
                content: formData.content,
                nickname: formData.nickname,
                category: formData.category,
                tags: formData.tags,
                images: imageUrls,
            };

            // Send data to backend
            const response = await api.post('/posts', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.code === 201) {
                toast.success('Create post successfully');
            } else {
                toast.error('Failed to create post');
            }
        } catch (error) {
            toast.error(`Error: ${error.message || 'Something went wrong'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-blog-container">
            <ToastContainer />
            <h2>Create a New Event Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="createBlog_form_input_title">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="createBlog_form_input_description">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="createBlog_form_input_nickname">
                    <label>Nickname</label>
                    <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="Enter your nickname"
                    />
                </div>
                <div className="createBlog_form_input_tag">
                    <label>Tags</label>
                    <input
                        type="text"
                        placeholder="Comma separated tags"
                        value={formData.tags.map((tag) => tag.name).join(', ')}
                        onChange={handleTagsChange}
                    />
                </div>
                <div className="createBlog_form_input_images">
                    <label>Images</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="createBlog_form_input_content">
                    <Editor
                        apiKey="llhl5dg6g4afdo293thlykxzzhwr3tf0vt2padr5bze8bnst"
                        value={formData.content}
                        onEditorChange={handleEditorChange}
                        init={{
                            height: 500,
                            menubar: false,
                        }}
                    />
                </div>
                <button className="blogCreate_btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
