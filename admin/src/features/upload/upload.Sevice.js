import axios from "axios";
import { BASE_URL } from "../../utils/base_urls";

const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.token
    : null;

const config = {
    headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` },
};

const uploadImage = async (data) => {
    const response = await axios.put(`${BASE_URL}upload`, data, config);
    return response.data;
}

const deleteImage = async (id) => {
    const response = await axios.delete(`${BASE_URL}upload/delete-img/${id}`, config);
    return response.data;
}

const uploadService = {
    uploadImage,
    deleteImage
};

export default uploadService;