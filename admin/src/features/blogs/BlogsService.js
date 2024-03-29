import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';

const getBlogs = async () => {
    const response = await axios.get(`${BASE_URL}blogs`)
    return response.data;
};

const blogsService = {
    getBlogs,
}

export default blogsService;