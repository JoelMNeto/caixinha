import axios from 'axios';
import { getAccessToken, getRefreshToken, logout, saveTokens } from './auth';
import { useLoadingStore } from './loadingStore';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

let isRefreshing = false;
let queue: any[] = [];

api.interceptors.request.use(async (config) => {
    useLoadingStore.getState().start();

    const token = await getAccessToken();

    if (token && !config.skipAuth) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        useLoadingStore.getState().stop();

        return response;
    },
    async (error) => {
        useLoadingStore.getState().stop();

        const originalRequest = error.config;

        if (error.response?.status === 401 && 
            !originalRequest._retry &&
            !originalRequest.skipAuth &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    queue.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = await getRefreshToken();
                
                const { data } = await api.post(
                    '/auth/refresh', 
                    { refreshToken }
                );

                const newAccessToken = data.token;
                const newRefreshToken = data.refreshToken;

                await saveTokens(newAccessToken, newRefreshToken);

                queue.forEach((cb) => cb(newAccessToken));
                queue = [];

                return api(originalRequest);
            } catch {
                await logout();
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
    }
);