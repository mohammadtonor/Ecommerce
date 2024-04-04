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

 

const productService = {
    getProducts,
    addProduct,
}

export default productService;