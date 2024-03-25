import { LiaShippingFastSolid } from "react-icons/lia";
import { BsGift } from "react-icons/bs";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export const services = [
    {
        id: 1,
        title: "Free Shipping",
        icon: <LiaShippingFastSolid size={40}/>,
        desc: "From all orders over $5.",
    },
    {
        id: 2,
        title: "Daily Surprise Offers",
        icon: <BsGift size={40}/>,
        desc: "Save upto 25% off",
    },
    {
        id: 3,
        title: "Support 24/7",
        icon: <FaHeadphonesSimple size={40}/>,
        desc: "Shop with an expert",
    },
    {
        id: 4,
        title: "Secure Payment",
        icon: <FaRegMoneyBillAlt size={40}/>,
        desc: "Get Factory PRice.",
    },
]