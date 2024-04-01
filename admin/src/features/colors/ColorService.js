import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import {config} from '../../utils/axiosConfig';

const getColors = async () => {
    const response = await axios.get(`${BASE_URL}colors`)
    return response.data;
};

const createColors = async (color) => {
    const response = await axios.post(`${BASE_URL}colors`, color, config)
    return response.data;
}

const colorsService = {
    getColors,
    createColors
}

export default colorsService;