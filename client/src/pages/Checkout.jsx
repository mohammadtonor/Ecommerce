import './checkout.scss';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <>
        <Meta title='Checkout'/>
        <div className='checkout-wrapper home-wrapper-2'>
            <div className='container-x'>
                <div className="checkout-container">
                    <div className='checkout-left-data'>
                        <div className="checkout-left-data__header">
                            <h3>Dev Center</h3>
                            <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                <li className='breadcrumb-item'>
                                        <Link to={'/cart'} className='breadcrump-link'>
                                            Cart
                                        </Link>
                                    </li>
                                    &nbsp; /
                                    <li className='breadcrumb-item' aria-colcount='page'>
                                        Information
                                    </li>
                                    &nbsp; / <li className='breadcrumb-item'>Shipping</li>
                                    &nbsp; / <li className='breadcrumb-item active' aria-colcount='page'>Payment</li>
                                </ol>
                            </nav>
                            <h3>Contact Information</h3>
                            <h5>Mohammad Tonor <span>(mtonor1368@gmail.com)</span></h5>
                            <Link to={'/signout'}>Lougout</Link>
                            <div>
                                <input type="checkbox" placeholder="" className="" />
                                <span>Eail me about special offers</span>
                            </div>
                        </div>
                        <form action="" className='checkout-left-data__form'>
                            <h5 >Shipping Adress</h5>
                            <div className="form-goup">
                                <select>
                                    <option value="1">Shipping Address 1</option>
                                    <option value="2">Shipping Address 2</option>
                                    <option value="3">Shipping Address 3</option>
                                </select>
                            </div>
                            <div className="form-goup">
                                <label htmlFor="shipping adress"></label>
                                <select>
                                    <option value="1">Shipping Address 1</option>
                                    <option value="2">Shipping Address 2</option>
                                    <option value="3">Shipping Address 3</option>
                                </select>
                            </div>
                            <div className='form-group-name'>
                                <input type="text" id="firstName" placeholder="FirstName (Optional)" />
                                <input type="text" id="lastName" placeholder="LastName (Optional)" />
                            </div>
                            <div className='form-group'>
                                <input type="text" id="address" placeholder="Address " />
                            </div>
                            <div className='form-group'>
                                <input type="text" id="appartment" placeholder="Apartment Suit (optional)" />
                            </div>
                            <div className='form-group-city'>
                                <input type="text" id="city" placeholder="City " />
                                <input type="text" id="state" placeholder="State " />
                                <input type="number" id="zipcode" placeholder="Address " />
                            </div>
                            <div className='form-group-action'>
                                <Link to={'/'}>Back to Cart</Link>
                                <button>Continue to Shipping</button>
                            </div>
                        </form>
                        <div className='checkout-left-data__footer'>
                           <p> All right reserved</p>
                        </div>
                    </div>
                    <div className='checkout-right-data'>
                        <div className='checkout-right-data__header'>
                            <h3>Your Order</h3>
                        </div>
                        <div className='checkout-right-data__body'>
                            <div className='checkout-right-data__body__item'>
                                <div className='checkout-right-data__body__item__img'>
                                    <span>1</span>
                                    <img src="https://res.cloudinary.com/dajdunc2w/image/upload/v1711308011/watch_qxcpb2.jpg" alt="" />
                                </div>
                                <div className='checkout-right-data__body__item__name'>
                                    <h5>apple watch for many color and size </h5>
                                    <div>
                                        <span>S</span>/
                                        <span>sk323j3</span>
                                    </div>
                                </div>
                                <div className='checkout-right-data__body__item__price'>
                                    <h5>$ 99.00</h5>
                                </div>
                            </div>
                            <div className='checkout-right-data__body__item'>
                                <div className='checkout-right-data__body__item__img'>
                                <span>1</span>
                                    <img src="https://res.cloudinary.com/dajdunc2w/image/upload/v1711308011/watch_qxcpb2.jpg" alt="" />
                                </div>
                                <div className='checkout-right-data__body__item__name'>
                                    <h5>apple watch for many color and size </h5>
                                    <div>
                                        <span>S</span>/
                                        <span>sk323j3</span>
                                    </div>
                                </div>
                                <div className='checkout-right-data__body__item__price'>
                                    <h5>$ 99.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className='checkout-right-data__footer'>
                            <div className='checkout-right-data__footer__subtotal'>
                                <h5>Subtotal</h5>
                                <p>$ 99.00</p>
                            </div>
                            <div className='checkout-right-data__footer__shipping'>
                                <h5>Shipping</h5>
                                <p>$10</p>
                            </div>
                            <div className='checkout-right-data__footer__total'>
                                <h5>Total</h5>
                                <p>$ 99.00</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout