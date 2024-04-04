import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
//import { config } from '../../utils/axiosConfig';

const getTokenFromLocalStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))?.token : null;
const config = {
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` }
};

const getBcategories = async () => {
    const response = await axios.get(`${BASE_URL}blogCategory`)
    return response.data;
};

const createBCategory = async (data) => {
    const response = await axios.post(`${BASE_URL}blogCategory`, data, config)
    return response.data;
}

const getOneBCategory = async (id) => {
    const response = await axios.get(`${BASE_URL}blogCategory/${id}`)
    return response.data;
}

const updateBCategory = async (id, data) => {
    const response = await axios.put(`${BASE_URL}blogCategory/${id}`, data, config)
    return response.data;
}

const deleteBCategory = async (id) => {
    console.log(config);
    const response = await axios.delete(`${BASE_URL}blogCategory/${id}`, config);
    return response.data;
}

const BCategoryService = {
    getBcategories,
    createBCategory,
    getOneBCategory,
    updateBCategory,
    deleteBCategory
}

export default BCategoryService;