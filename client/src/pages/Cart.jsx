import './cart.scss';
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import { FaRegTrashAlt } from "react-icons/fa";
import Container from '../components/Container';

const Cart = () => {
  return (
    <>
        <Meta title='Cart'/>
        <BreadCrump title='Cart'/>
        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="cart-main">
                <div className="cart-header">
                    <span>product</span>
                    <span>price</span>
                    <span>quantity</span>
                    <span>Action</span>
                    <span>total</span>
                </div>
                <div className="cart-item">
                    <div className="cart-item-detail">
                        <img src="https://res.cloudinary.com/dajdunc2w/image/upload/v1711308011/watch_qxcpb2.jpg" alt="product"/>
                        <div className="cart-item-info">
                            <div>product <span>name</span></div>
                            <div>Size  <span>S</span></div>
                            <div>color <span>X</span></div>
                        </div>
                    </div>
                    <div className="cart-item-price">
                        <span>$100</span>
                    </div>
                    <div className="cart-item-quantity">
                        <div>
                            <div>
                                <button>+</button>
                                <button>-</button>
                            </div>
                            <span>1</span>
                        </div>
                    </div>
                    <div className='cart-item-action'>
                        <span>
                            <FaRegTrashAlt />
                        </span>
                    </div>
                    <div className="cart-item-total">
                        <span>$100</span>
                    </div>
                </div>
                <div className='cart-footer'>
                    <div className="cart-footer-left">
                        <button>continue shopping</button>
                    </div>
                    <div className="cart-footer-right">
                        <h5>Order Special introduction</h5>
                        <div>
                            <h5>subtotal</h5>
                            <span>$100.00</span>
                        </div>                        
                    </div>
                    <div className='cart-footer-bottom'>
                        <span>Taxes and shipping cost at checkout</span>
                        <button>checkout</button>
                    </div>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Cart