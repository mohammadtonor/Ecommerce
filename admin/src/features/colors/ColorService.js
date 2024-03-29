import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getColors = async () => {
    const response = await axios.get(`${BASE_URL}colors`)
    return response.data;
};

const colorsService = {
    getColors,
}

export default colorsService;