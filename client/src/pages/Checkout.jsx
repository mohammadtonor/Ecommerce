import './checkout.scss';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import {object, string} from 'yup'
import {useFormik} from 'formik';
import { toast } from 'react-toastify';
import { getTokenfromStorage } from '../utils/configToken';
import { getPrroductCarts } from '../features/users/userSlice';
import { BASE_URL } from '../utils/baseUrl';


const infoSchema = object({
    firstName: string().required('FirstName is required'),
    lastName: string().required('LastName is required'),
    address: string().required('Adress is required'),
    city: string().required('City is required'),
    state: string().required('State is required'),
    zipCode: string().required('Zip is required'),
    country: string().required('Country is required'),
})

const Checkout = () => {
    const [subtotal, setSubtotal] = useState(0);
    const dispach = useDispatch();
    useEffect(() => {
        dispach(getPrroductCarts())
    }, [])
    const cartState = useSelector(state => state.auth.cartProducts);
    useEffect(() => {
        setSubtotal(cartState?.reduce((acc, cur) => {
            return acc + cur.price;
    }, 0));
  }, [cartState])

  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        address: '',
        other: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        country: '',
    },
    validationSchema: infoSchema,
    onSubmit: async (values) => {
        await fetch(`${BASE_URL}users/cart/checkout`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getTokenfromStorage}`
             },
            body: JSON.stringify({
                shippingInfo: {
                    ...values
                },
                cartProducts: cartState
            }),
        }).then( async (res) => {
             if(res.ok) {
                toast.success("Resirecting to payment")
                const href = await res.json()
                window.location.replace(href);
            } else {
                toast.error("Something went wrong")
            }  
        }) 
    }  
  })

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
                                    <li className='breadcrumb-item'>
                                        Information
                                    </li>
                                    &nbsp; / <li className='breadcrumb-item'>Shipping</li>
                                    &nbsp; / <li className='breadcrumb-item active'>Payment</li>
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
                        <form onSubmit={formik.handleSubmit} action="" className='checkout-left-data__form'>
                            <h5 >Shipping Adress</h5>
                            <div className="form-goup">
                                <select
                                    id='country'
                                    placeholder='Please select a country'
                                    value={formik.values.country}
                                    onChange={formik.handleChange('country')}
                                    onBlur={formik.handleBlur('country')}
                                >
                                    <option value={null}>Select a Country</option>
                                    <option value="1">Iran</option>
                                    <option value="2">UAE</option>
                                    <option value="3">USA</option>
                                </select>
                                <div className="error">
                                    {formik.touched?.country && formik.errors?.country ? (
                                        <div className='mb-2'>{formik.errors.country}</div>
                                    ) : null}
                                </div> 
                            </div>
                            <div className='form-group-name'>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name='firstName' 
                                    placeholder="FirstName (Optional)" 
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange('firstName')}
                                    onBlur={formik.handleBlur('firstName')}
                                />
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    placeholder="LastName (Optional)" 
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange('lastName')}
                                    onBlur={formik.handleBlur('lastName')}
                                />
                                
                            </div>
                            <div className='d-flex justify-content-between text-red'>
                                <div className="error">
                                    {formik.touched?.firstName && formik.errors?.firstName ? (
                                        <div className='mb-2'>{formik.errors.firstName}</div>
                                    ) : null}
                                </div> 
                                <div className="error">
                                    {formik.touched?.lastName && formik.errors?.lastName ? (
                                        <div className='mb-2'>{formik.errors.lastName}</div>
                                    ) : null}
                                </div>
                            </div> 
                            <div className='form-group'>
                                <input 
                                    type="text" 
                                    id="address" 
                                    placeholder="Address " 
                                    value={formik.values.address}
                                    onChange={formik.handleChange('address')}
                                    onBlur={formik.handleBlur('address')}
                                />
                            </div>
                            <div className="error mb-0 p-0">
                                    {formik.touched?.address && formik.errors?.address ? (
                                        <div className='mb-2'>{formik.errors.address}</div>
                                    ) : null}
                            </div> 
                            <div className='form-group'>
                                <input 
                                    type="text" 
                                    id="other" 
                                    placeholder="Apartment Suit (optional)" 
                                    value={formik.values.other}
                                    onChange={formik.handleChange('other')}
                                />
                            </div>
                            <div className='form-group-city'>
                                <input 
                                    type="text" 
                                    id="city" 
                                    placeholder="City " value={formik.values.city}
                                    onChange={formik.handleChange('city')}
                                    onBlur={formik.handleBlur('city')}
                                />
                                <input 
                                    type="text" 
                                    id="state" 
                                    placeholder="State " 
                                    value={formik.values.state}
                                    onChange={formik.handleChange('state')}
                                    onBlur={formik.handleBlur('state')}
                                />
                                <input 
                                    type="text" 
                                    id="zipCode" 
                                    placeholder="pinCode " 
                                    value={formik.values.zipCode}
                                    onChange={formik.handleChange('zipCode')}
                                    onBlur={formik.handleBlur('zipCode')}
                                /> 
                            </div>
                            <div className='d-flex justify-content-between text-red'>
                                    <div className="error">
                                        {formik.touched?.city && formik.errors?.city ? (
                                            <div className='mb-2'>{formik.errors.city}</div>
                                        ) : null}
                                    </div> 
                                    <div className="error">
                                        {formik.touched?.state && formik.errors?.state ? (
                                            <div className='mb-2'>{formik.errors.state}</div>
                                        ) : null}
                                    </div>
                                    <div className="error">
                                        {formik.touched?.zipCode && formik.errors?.zipCode ? (
                                            <div className='mb-2'>{formik.errors.zipCode}</div>
                                        ) : null}
                                    </div>
                                </div>
                            <div className='form-group-action'>
                                <Link to={'/'}>Back to Cart</Link>
                                <button type='submit'>Continue to Shipping</button>
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
                            {cartState?.length > 0 && cartState.map((item, index) => (
                                <div key={index} className='checkout-right-data__body__item'>
                                    <div className='checkout-right-data__body__item__img'>
                                        <span>{item.quantity}</span>
                                        <img src="https://res.cloudinary.com/dajdunc2w/image/upload/v1711308011/watch_qxcpb2.jpg" alt="" />
                                    </div>
                                    <div className='checkout-right-data__body__item__name'>
                                        <h5>{item.productId?.title}</h5>
                                        <div>
                                            <span></span>
                                            <span>{item.color.title}</span>
                                        </div>
                                    </div>
                                    <div className='checkout-right-data__body__item__price'>
                                        <h5>${item.price.toFixed(2)}</h5>
                                    </div>
                                </div>
                        
                            ))}
                        </div>
                        <div className='checkout-right-data__footer'>
                            <div className='checkout-right-data__footer__subtotal'>
                                <h5>Subtotal</h5>
                                <p>$ {subtotal?.toFixed(2)}</p>
                            </div>
                            <div className='checkout-right-data__footer__shipping'>
                                <h5>Shipping</h5>
                                <p>$10</p>
                            </div>
                            <div className='checkout-right-data__footer__total'>
                                <h5>Total</h5>
                                <p>$ {(subtotal + 10)?.toFixed(2)}</p>
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