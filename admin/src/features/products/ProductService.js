import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}products`)
    return response.data;
};

const productService = {
    getProducts,
}

export default productService;