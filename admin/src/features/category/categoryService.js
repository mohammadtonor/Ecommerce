import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getcategories = async () => {
    const response = await axios.get(`${BASE_URL}categories`)
    return response.data;
};

const categoryService = {
    getcategories,
}

export default categoryService;