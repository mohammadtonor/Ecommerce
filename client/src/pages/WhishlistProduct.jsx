import './whishListProduct.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import WhashlistCard from '../components/whashlist-product/WhashlistCard';
import Container from './../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductWhishlist } from '../features/users/userSlice';

const WhishlistProduct = () => {
  const dispatch = useDispatch();
  const {whishlist} = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(getProductWhishlist())
  }, [])

  return (
    <>
        <Meta title='Whishlist'/>
        <BreadCrump title='Whishlist'/>
        <Container class1='home-wrapper-2 py-5'>
            {whishlist?.length === 0 &&  <h3 className='text-center w-100'>No whishlist</h3>}
          <div className='whishlist '>
            {whishlist?.length > 0 && whishlist.map((item) => (
              <WhashlistCard item={item} key={item._id}/>
            ))}
          </div>
        </Container>
    </>
  )
}

export default WhishlistProduct