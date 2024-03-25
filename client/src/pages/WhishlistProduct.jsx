import './whishListProduct.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import WhashlistCard from '../components/whashlist-product/WhashlistCard';
import Container from './../components/Container';
const whishlistProduct = () => {
  return (
    <>
        <Meta title='Whishlist'/>
        <BreadCrump title='Whishlist'/>
        <Container class1='home-wrapper-2 py-5'>
          <div className='whishlist '>
            <WhashlistCard />
            <WhashlistCard />
            <WhashlistCard />
            <WhashlistCard />
          </div>
        </Container>
    </>
  )
}

export default whishlistProduct