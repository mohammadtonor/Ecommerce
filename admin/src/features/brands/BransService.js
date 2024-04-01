import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import {config} from './../../utils/axiosConfig';

const getBrands = async () => {
    const response = await axios.get(`${BASE_URL}brands`)
    return response.data;
};

const addBrand = async (brand) => {
    const response = await axios.post(`${BASE_URL}brands`, brand, config)
    return response.data
}

const brandService = {
    getBrands,
    addBrand,
} 

export default brandService;