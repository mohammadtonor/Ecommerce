import axios  from  'axios'
import { BASE_URL } from '../../utils/baseUrl';
import { config } from '../../utils/configToken';


const registerUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}auth/register`, userData)
    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }
    return response.data;
}

const loginUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}auth/login`, userData);
    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data))
    }
    return response.data;
} 

const getProductWhishlist = async () => {
    const response = await axios.get(`${BASE_URL}users/wishlist`, config)
    return response.data;
}

const userService = {
    registerUser,
    loginUser,
    getProductWhishlist,
}

export default userService;