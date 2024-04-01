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

const categoryService = {
    getcategories,
    createCategory
}

export default categoryService;