import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getBcategories = async () => {
    const response = await axios.get(`${BASE_URL}blogCategory`)
    return response.data;
};

const BCategoryService = {
    getBcategories,
}

export default BCategoryService;