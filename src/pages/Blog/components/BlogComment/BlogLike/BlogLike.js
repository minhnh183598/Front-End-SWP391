import React, { useState, useEffect } from 'react';
import api from '~/config/axios';
import { Button } from '@mui/material';

const BlogLike = ({ postId }) => {
    const [likeCount, setLikeCount] = useState([]);
    const [liked, setLiked] = useState(false);

    const fetchLikeStatus = async () => {
        try {
            const response = await api.get(`posts/${postId}`);
            // setLikeCount(response.data);
            // setLiked(response.data.userLiked); // true nếu người dùng đã like, ngược lại là false
            setLikeCount(response.data.result.likeCount);
        } catch (error) {
            console.error('Error fetching like status:', error);
        }
    };

    console.log('Day la so like: ', likeCount);

    useEffect(() => {
        fetchLikeStatus();
    }, []);

    const handleLikeToggle = async () => {
        try {
            if (liked) {
                // Nếu đã like, gọi API để unlike
                await api.post(`posts/${postId}/unlike`);
                setLikeCount((prev) => prev - 1);
            } else {
                // Nếu chưa like, gọi API để like
                await api.post(`posts/${postId}/like`);
                setLikeCount((prev) => prev + 1);
            }
            setLiked(!liked); // Đảo trạng thái liked
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    return (
        <div className="blogLikeSection">
            <Button variant="contained" color={liked ? 'secondary' : 'primary'} onClick={handleLikeToggle}>
                {liked ? 'Unlike' : 'Like'}
            </Button>
            <span>{likeCount} likes</span>
        </div>
    );
};

export default BlogLike;
