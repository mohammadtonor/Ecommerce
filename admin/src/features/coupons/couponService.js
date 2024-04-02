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

const couponService = {
    getCoupons,
    addCoupon,
} 

export default couponService;