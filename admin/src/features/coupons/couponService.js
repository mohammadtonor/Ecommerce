import axios from 'axios';
import {BASE_URL} from '../../utils/base_urls';
import {config} from '../../utils/axiosConfig';

const getCoupons = async () => {
    const response = await axios.get(`${BASE_URL}coupons`)
    return response.data;
};

const addCoupon = async (coupon) => {
    const response = await axios.post(`${BASE_URL}coupons`, coupon, config)
    return response.data
}

const getOneCoupon = async (id) => {
    const response = await axios.get(`${BASE_URL}coupons/${id}`)
    return response.data;
} 

const updateOneCoupon = async (id, coupon) => {
    const response = await axios.put(`${BASE_URL}coupons/${id}`, coupon, config)
    return response.data
}

const deleteOneCoupon = async (id) => {
    const response = await axios.delete(`${BASE_URL}coupons/${id}`, config);
    return response.data;
}

const couponService = {
    getCoupons,
    addCoupon,
    getOneCoupon,
    updateOneCoupon,
    deleteOneCoupon
} 

export default couponService;