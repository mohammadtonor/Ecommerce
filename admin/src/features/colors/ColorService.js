import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getTokenFromLocalStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))?.token : null;
export const config = {
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` }
};
const getColors = async () => {
    const response = await axios.get(`${BASE_URL}colors`)
    return response.data;
};

const createColors = async (color) => {
    const response = await axios.post(`${BASE_URL}colors`, color, config)
    return response.data;
}

const getOneColors = async (id) => {
    const response = await axios.get(`${BASE_URL}colors/${id}`)
    return response.data;
}

const updateColor = async (id, color) => {
    const response = await axios.put(`${BASE_URL}colors/${id}`, color, config)
    return response.data;
}

const deleteColor = async (id) => {
    const response = await axios.delete(`${BASE_URL}colors/${id}`, config);
    return response.data;
}

const colorsService = {
    getColors,
    createColors,
    getOneColors,
    updateColor,
    deleteColor
}

export default colorsService;