import './whishListProduct.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import WhashlistCard from '../components/whashlist-product/WhashlistCard';

const whishlistProduct = () => {
  return (
    <>
        <Meta title='Whishlist'/>
        <BreadCrump title='Whishlist'/>
        <div className='home-wrapper-2 py-5'>
          <div className='container-xxl'>
            <div className='whishlist '>
              <WhashlistCard />
              <WhashlistCard />
              <WhashlistCard />
              <WhashlistCard />
            </div>
          </div>
        </div>
    </>
  )
}

export default whishlistProduct