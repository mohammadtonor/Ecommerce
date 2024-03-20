import { LiaShippingFastSolid } from "react-icons/lia";
import { BsGift } from "react-icons/bs";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
 
const HomeServices = () => {
  return (
    <div className=''>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-12'>
                    <div className='home-service'>
                        <div className="home-service-item">
                            <LiaShippingFastSolid size={40}/>
                            <div>
                                <h6>Free Shipping</h6>
                                <p>From all orders over $5</p>
                            </div>
                        </div>
                        <div className="home-service-item">
                            <BsGift size={40}/>
                            <div>
                                <h6>Daily Surprise Offers</h6>
                                <p>Save upto 25% off</p>
                            </div>
                        </div>
                        <div className="home-service-item">
                            <FaHeadphonesSimple size={40}/>
                            <div>
                                <h6>Support 24/7</h6>
                                <p>Shop with an expert</p>
                            </div>
                        </div>
                        <div className="home-service-item">
                            <FaRegMoneyBillAlt size={40}/>
                            <div>
                                <h6>Secure Payment</h6>
                                <p>Get Factory PRice</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeServices