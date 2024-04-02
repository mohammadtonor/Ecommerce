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

const getBrandById = async (id) => {
    const response = await axios.get(`${BASE_URL}brands/${id}`)
    return response.data;
};

const updateBrand = async (brand) => {
    const {id , brandData} =  brand
    const response = await axios.put(`${BASE_URL}brands/${id}`, brandData, config)
    return response.data
}

const deleteBrand = async (id) => {
    const response = await axios.delete(`${BASE_URL}brands/${id}`, config)
    return response.data
}

const brandService = {
    getBrands,
    addBrand,
    getBrandById,
    updateBrand,
    deleteBrand
} 

export default brandService;