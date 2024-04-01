import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import { config } from '../../utils/axiosConfig';

const getBlogs = async () => {
    const response = await axios.get(`${BASE_URL}blogs`)
    return response.data;
};

const createBlog = async (blog) => {
    const response = await axios.post(`${BASE_URL}blogs`, blog, config);
    return response.data;
}

const blogsService = {
    getBlogs,
    createBlog
}

export default blogsService;