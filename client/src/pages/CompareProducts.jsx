import './compareProducts.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import CompareProductCard from '../components/compar-product/CompareCard';
import Container from '../components/Container';

const CompareProducts = () => {
  return (
    <>
        <Meta title='Compare Products'/>
        <BreadCrump title='Compare Products'/>
        <Container class1="compare-products-wrapper home-wrapper-2 py-5">
            <div className="compare-container">
              <CompareProductCard />
              <CompareProductCard />
              <CompareProductCard />
              <CompareProductCard />
            </div>
          </Container>
    </>
  )
}

export default CompareProducts