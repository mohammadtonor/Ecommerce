import axios  from  'axios'
import { BASE_URL } from '../../utils/baseUrl';


const registerUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}auth/register`, userData)
    return response.data;
}

const userService = {
    registerUser,
}

export default userService;