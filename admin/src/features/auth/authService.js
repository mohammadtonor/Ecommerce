import axios from 'axios';
import {BASE_URL} from './../../utils/base_urls';

const login = async (user) => {
    const response = await axios.post(`${BASE_URL}auth/admin-login`, user)
    console.log(response.data);
    return response.data;
};

const register = async (userData) => {
    const res = await axios.post(`${BASE_URL}auth/register`, userData);
    console.log(res);
}

const forgotPassword = async (userData) => {
    const res = await axios.post(`${BASE_URL}auth/forgot-password`, userData);
    console.log(res.data);
}

const resetPassword = async (userData) => {
    const res = await axios.post(`${BASE_URL}auth/reset-password`, userData);
    console.log(res);
}

const logout = async (userData) => {
    const res = await axios.post(`${BASE_URL}auth/logout`, userData);
    console.log(res);
}

const authService = {
    login,
    register,
    forgotPassword,
    resetPassword,
    logout
};

export default authService;
