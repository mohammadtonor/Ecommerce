import './compareProducts.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import CompareProductCard from '../components/compar-product/CompareCard';

const CompareProducts = () => {
  return (
    <>
        <Meta title='Compare Products'/>
        <BreadCrump title='Compare Products'/>
        <div className="compare-products-wrapper home-wrapper-2 py-5">
          <div className="container-xxl">
            <div className="compare-container">
              <CompareProductCard />
              <CompareProductCard />
              <CompareProductCard />
              <CompareProductCard />
            </div>
          </div>
          </div>
    </>
  )
}

export default CompareProducts