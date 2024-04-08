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
 
const addToCart = async (cartData) => {
    const response = await axios.put(`${BASE_URL}users/add-cart`, cartData, config)
    return response.data;
}

const getPrroductCarts = async () => {
    const response = await axios.get(`${BASE_URL}users/get-cart`, config)
    return response.data;
}

const removeFromCard = async (cartId) => {
    const response = await axios.put(`${BASE_URL}users/remove-cart`, cartId, config)
    return response.data;
}

const updateCartItem = async (cartDate) => {
    console.log(cartDate);
    const response = await axios.put(`${BASE_URL}users/update-cart`, cartDate, config)
    return response.data;
}

const userService = {
    registerUser,
    loginUser,
    getProductWhishlist,
    addToCart,
    getPrroductCarts,
    removeFromCard,
    updateCartItem
}

export default userService;