import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import './Orders.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getOrdersByUserId} from './../features/users/userSlice'
const Orsers = () => {
  const dispatch = useDispatch()
  const {customerOrders} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getOrdersByUserId())
  }, [])
  return (
    <> 
       <Meta title='Our Store'/>
       <BreadCrump title='Our Store'/>
       <div className='home-wrapper-2 py-5'>
           <div className='container-xxl order-list'>
              <div className='header-table'>
                <div>
                    <h3>OrderId</h3>
                </div>
                <div>
                    <h3>ToalAmount</h3>
                </div>
                <div>
                    <h3>
                        TotalAfterDiscount
                    </h3>
                </div>
                <div>
                    <h3>Status</h3>
                </div>
              </div>
              {customerOrders?.length > 0 
                && customerOrders.map((order) => (
                    <>
                    <div key={order?._id} className='header-table'>
                        <div>
                            <h3>{order._id}</h3>
                        </div>
                        <div>
                            <h3>{order?.totalPrice}</h3>
                        </div>
                        <div>
                            <h3>
                                {order?.totalPriceAfterDiscount}
                            </h3>
                        </div>
                        <div>
                            <h3>{order?.orderStatus}</h3>
                        </div>
                    </div>
                
                    <div key={order?._id} className='productItem-Order-table'>
                        <div>
                            <div>
                                <h3>Product Name</h3>
                            </div>
                            <div>
                                <h3>Quantity</h3>
                            </div>
                            <div>
                                <h3>
                                    Price
                                </h3>
                            </div>
                            <div>
                                <h3>Color</h3>
                            </div>
                        </div>
                        {order?.orderItems?.length > 0 && order?.orderItems?.map(item => (
                        <div key={item?._id} className='mb-2'>
                            <div>
                                <h3>{item?.product?.title}</h3>
                            </div>
                            <div>
                                <h3>{item?.quantity}</h3>
                            </div>
                            <div>
                                <h3>
                                    {item?.price}
                                </h3>
                            </div>
                            <div>
                                <h3>{item?.color?.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            ))}
           </div>
       </div>
    </>
  )
}

export default Orsers