import { useEffect } from 'react';
import api from '~/config/axios';

const useAuth = () => {
    const refreshToken = async () => {
        const rfToken = localStorage.getItem('refreshToken');
        if (!rfToken) return;

        try {
            const response = await api.post('auth/refresh', {
                token: rfToken,
            });
            localStorage.setItem('token', response.data.result.token);
            localStorage.setItem('refreshToken', response.data.result.refreshToken);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken();
        }, 3500000);

        return () => clearInterval(interval);
    }, []);
};

export default useAuth;
