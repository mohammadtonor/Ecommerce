import React from 'react'

const FamousCard = ({imageSrc}) => {
  return (
    <div className='famous-card'>
        <div className='famous-card-content'>
            <span className='famous-title'>Product Name</span>
            <span className='famous-detail'>Product Description</span>
            <span className='famous-price'>Price: $100</span>
        </div>
        <div className='famous-card-img'>
            <img src={imageSrc} alt='famous' />
        </div>
    </div>
  )
}

export default FamousCard