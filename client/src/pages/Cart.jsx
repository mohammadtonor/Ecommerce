import './cart.scss';
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import { FaRegTrashAlt } from "react-icons/fa";
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { getPrroductCarts, removeFromCart, updateCartItem } from '../features/users/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartProducts} = useSelector(state => state.auth);
  const [subtotle, setSubtotla] = useState(0);

  useEffect(() => {
    dispatch(getPrroductCarts())
  }, []);

  useEffect(() => {
    let total = !!cartProducts && cartProducts?.reduce((acc, curr) => acc + curr.price, 0);
    setSubtotla(total);    
  }, [cartProducts])

  const removeItemFromCart = (id) => {
      dispatch(removeFromCart({cartId: id}))
      setTimeout(() => dispatch(getPrroductCarts()), 50)
    }
    
    const handleCartQuantity = (cartId, quantity,price, option) => {
        if (option === 'inc') {
        dispatch(updateCartItem({cartId, option, price}))
    } else if (option === 'dec') {
        if (quantity === 1 ) {
            dispatch(removeFromCart({cartId}))
            
        } else {
            dispatch(updateCartItem({cartId, option, price}))
        }
    }
    setTimeout(() => dispatch(getPrroductCarts()), 100)
   }

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
                {cartProducts && cartProducts.length > 0 && cartProducts. map((item, index) =>(                    
                    <div key={index} className="cart-item">
                        <div className="cart-item-detail">
                            <img src={item?.productId?.images[0]?.url} alt="product"/>
                            <div className="cart-item-info">
                                <div>{item?.productId?.title}</div>
                                <div>Size  <span>S</span></div>
                                <div>color <span>{item?.color?.title}</span></div>
                            </div>
                        </div>
                        <div className="cart-item-price">
                            <span>$ {item?.productId?.price}</span>
                        </div>
                        <div className="cart-item-quantity">
                            <div>
                                <div>
                                    <button 
                                        onClick={() => handleCartQuantity(item._id, item?.quantity, item?.productId?.price,'inc')}
                                    >+
                                    </button>
                                    <button
                                        onClick={() => handleCartQuantity(item._id, item?.quantity, item?.productId?.price,'dec')}
                                    >-</button>
                                </div>
                                <span>{item?.quantity}</span>
                            </div>
                        </div>
                        <div className='cart-item-action'>
                            <span onClick={() => removeItemFromCart(item._id)}>
                                <FaRegTrashAlt />
                            </span>
                        </div>
                        <div className="cart-item-total">
                            <span>$ {item?.price}</span>
                        </div>
                    </div>
                ))}
                <div className='cart-footer'>
                    <div className="cart-footer-left">
                        <button>continue shopping</button>
                    </div>
                    <div className="cart-footer-right">
                        <h5>Order Special introduction</h5>
                        <div>
                            <h5>subtotal</h5>
                            <span>${!!subtotle && subtotle?.toFixed(2)}</span>
                        </div>                        
                    </div>
                    <div className='cart-footer-bottom'>
                        <span>Taxes and shipping cost at checkout</span>
                        <button onClick={() => navigate('/checkout')}>checkout</button>
                    </div>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Cart