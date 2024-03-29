import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getEnquary = async () => {
    const response = await axios.get(`${BASE_URL}enquiry`)
    return response.data;
};

const enqService = {
    getEnquary,
}

export default enqService;