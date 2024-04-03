import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import { config } from '../../utils/axiosConfig';

const getcategories = async () => {
    const response = await axios.get(`${BASE_URL}categories`)
    return response.data;
};

const createCategory = async (category) => {
    const response = await axios.post(`${BASE_URL}categories`,category, config);
    return response.data
}

const getOnePCategory = async (id) => {
    const response = await axios.get(`${BASE_URL}categories/${id}`,id);
    return response.data
}

const updatePCategory = async (id, category) => {
    console.log(category);
    const response = await axios.put(`${BASE_URL}categories/${id}`,category, config)
    return response.data
}

const deletePCategory = async (id) => {
    const response = await axios.delete(`${BASE_URL}categories/${id}`, config);
    return response.data
}

const categoryService = {
    getcategories,
    createCategory,
    updatePCategory,
    deletePCategory,
    getOnePCategory
}

export default categoryService;