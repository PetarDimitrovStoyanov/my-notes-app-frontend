import axios from 'axios'
import store from '../store/store';
import router from "@/router";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 5000,
})

instance.interceptors.request.use((config) => {
    if (config.url.endsWith('/login')) {
        return config;
    }

    const authToken = store.state.token;

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
})

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 409 || error.response.status === 401 || error.response.status === 403) {
            router.push({ path: "/login", params: {} });
        }
        console.error(error.response.status);
        return Promise.reject(error);
    }
);

export default instance
