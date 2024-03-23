import { CiTrash } from "react-icons/ci";

const CompareProductCard = () => {
  return (
    <div className='product-card-compare'>
      <div className='product-card__image'>
        <CiTrash />
        <img src='/images/watch.jfif' alt='product' />
      </div>
      <div className='product-card__content'>
        <span className='product-card__title'>Apple Watch Series 9</span>
        <span className='product-card__price'>$99.99</span>
        <div className='product-card__item'>
          <span>Brand:</span>
          <span>Apple</span>
        </div>
        <div className='product-card__item'>
          <span>Type:</span>
          <span>Watches</span>
        </div>
        <div className='product-card__item'>
          <span>SKU:</span>
          <span>SRT456</span>
        </div>
        <div className='product-card__item'>
          <span>Availability:</span>
          <span>in stock</span>
        </div>
        <div className='product-card__item'>
          <span>Color:</span>
          <div className="product-card__color">
            <div className="product-card__color__badge"></div>
            <div className="product-card__color__badge"></div>
            <div className="product-card__color__badge"></div>
          </div>
        </div>
        <div className='product-card__item'>
          <span>Size:</span>
          <div className="product-card__size">
            <span className="product-card__size__badge">S</span>
            <span className="product-card__size__badge">M</span>
            <span className="product-card__size__badge">L</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareProductCard