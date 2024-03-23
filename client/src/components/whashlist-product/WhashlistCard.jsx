import { CiTrash } from "react-icons/ci";

const WhashlistCard = () => {
  return (
    <div className='whashlist-card'>
      <div className='product-card__image'>
        <CiTrash />
        <img src='/images/watch.jfif' alt='product' />
      </div>
      <div className='product-card__content'>
        <span className='product-card__title'>Apple Watch Series 9</span>
        <span className='product-card__price'>$99.99</span>
      
      </div>
    </div>
  )
}

export default WhashlistCard