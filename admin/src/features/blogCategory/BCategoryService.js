import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import { config } from '../../utils/axiosConfig';

const getBcategories = async () => {
    const response = await axios.get(`${BASE_URL}blogCategory`)
    return response.data;
};

const createBCategory = async (data) => {
    const response = await axios.post(`${BASE_URL}blogCategory`, data, config)
    return response.data;
}

const BCategoryService = {
    getBcategories,
    createBCategory
}

export default BCategoryService;