import React from 'react'

const FamousCard = ({imageSrc, category, title, price}) => {
  return (
    <div className='famous-card'>
        <div className='famous-card-content'>
            <span className='famous-title'>{category}</span>
            <span className='famous-detail'>{title}</span>
            <span className='famous-price'>{price}</span>
        </div>
        <div className='famous-card-img'>
            <img src={imageSrc} alt='famous' />
        </div>
    </div>
  )
}

export default FamousCard