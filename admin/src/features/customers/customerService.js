import axios from 'axios';
import {BASE_URL} from './../../utils/base_urls';

const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}users/get-all`)
    return response.data;
};

const customerService = {
    getUsers,
}

export default customerService;