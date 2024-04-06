import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getTokenFromLocalStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))?.token : null;
const config = {
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` }
};

const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}products`)
    return response.data;
};

const addProduct = async (productData) => {
    console.log(productData);
    const response = await axios.post(`${BASE_URL}products` ,productData, config)
    return response.data;
}

const getOneProduct = async (id) => {
    const response = await axios.get(`${BASE_URL}products/${id}`)
    return response.data;
}

const updateOneProduct = async (id, productData) => {
    const response = await axios.put(`${BASE_URL}products/${id}`, productData, config)
    return response.data;
}

const deleteOneProduct = async (id) => {
    const response = await axios.delete(`${BASE_URL}products/${id}`, config);
    return response.data;
}

const productService = {
    getProducts,
    addProduct,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct
}

export default productService;