import axios from 'axios';
import {BASE_URL} from './../../utils/baseUrl'
import {config} from './../../utils/configToken'

const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}products`);
    return response.data
}

const addToWishList = async (prodId) => {
    const response = await axios.put(`${BASE_URL}products/wishlist`, { prodId }, config)
    return response.data
}

const getOneProduct = async (prodId) => {
    const response = await axios.get(`${BASE_URL}products/${prodId}`)
    return response.data;
}

const productService = {
    getProducts,
    addToWishList,
    getOneProduct
}

export default productService;