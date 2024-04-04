import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import { config } from '../../utils/axiosConfig';

const getEnquary = async () => {
    const response = await axios.get(`${BASE_URL}enquiry`)
    return response.data;
};

const getOneEnquiry = async (id) => {
    const response = await axios.get(`${BASE_URL}enquiry/${id}`)
    return response.data
}

const deleteEnquary = async (id) => {
    const response = await axios.delete(`${BASE_URL}enquiry/${id}`, config)
    return response.data;
}

const updateEnquary = async (id, data) => {
    const response = await axios.put(`${BASE_URL}enquiry/${id}`, {status: data}, config)
    return response.data
}

const enqService = {
    getEnquary,
    deleteEnquary,
    getOneEnquiry,
    updateEnquary
}

export default enqService;