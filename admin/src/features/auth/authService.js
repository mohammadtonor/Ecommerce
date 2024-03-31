import axios from 'axios';
import {BASE_URL} from './../../utils/base_urls';

const getTokenFromLocalStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))?.token : null;
const config = {
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` }
};

const login = async (user) => {
    const response = await axios.post(`${BASE_URL}auth/admin-login`, user)
    localStorage.setItem('user', JSON.stringify(response.data));
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

const getOrders = async () => {
    const response = await axios.get(`${BASE_URL}users/getAll-orders`, config)
    return response.data;
};


const authService = {
    login,
    getOrders,
    register,
    forgotPassword,
    resetPassword,
    logout
};

export default authService;
