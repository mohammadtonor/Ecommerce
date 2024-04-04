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

const getOneBlog = async (id) => {
    const response = await axios.get(`${BASE_URL}blogs/${id}`)
    return response.data;
}

const updateBlog = async (id, blog) => {
    const response = await axios.put(`${BASE_URL}blogs/${id}`, blog, config)
    return response.data;
}

const deleteBlog = async (id) => {
    const response = await axios.delete(`${BASE_URL}blogs/${id}`, config)
    return response.data;
}

const blogsService = {
    getBlogs,
    createBlog,
    getOneBlog,
    updateBlog,
    deleteBlog
}

export default blogsService;