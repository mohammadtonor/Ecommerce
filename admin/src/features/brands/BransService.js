import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getBrands = async () => {
    const response = await axios.get(`${BASE_URL}brands`)
    return response.data;
};

const brandService = {
    getBrands,
}

export default brandService;