import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const getBlogs = async () => {
    const response = await axios.get(`${BASE_URL}blogs`)
    return response.data;
}

const getBlogcategories = async () => {
    const response = await axios.get(`${BASE_URL}blogCategory`)
    return response.data;
}

const getOneBlog = async (id) => {
    const response = await axios.get(`${BASE_URL}blogs/${id}`);
    return response.data;
}

const blogService = {
    getBlogs,
    getBlogcategories,
    getOneBlog
}

export default blogService;