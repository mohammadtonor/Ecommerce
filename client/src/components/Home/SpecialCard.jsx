import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import './productCard.scss'
const SpecialCard = ({item}) => {
  return (
    <div className='special-card'>
      <div className='special-image'>
        <img src='/images/watch.jfif' alt='special' />
      </div>
      <div className="special-content">
        <span className='brand'>{item?.brand?.title}</span>
        <h5 className='special-title'>{item?.title}</h5>
        <Rating ratingValue={4} size={20} initialValue={3}/>
        <h5 className='special-price'><span>$ {item?.price}</span> &nbsp; <span>$ 1299</span></h5>
        <div className='discount-fill'>
          <p>
            <b>5 days</b>
          </p>
          <div className='discount-time'>
            <span className="discount-time-badge">01</span>
            <span className="discount-time-badge">01</span>
            <span className="discount-time-badge">01</span>
          </div>
        </div>
        <div className='product-count'>
          <p>Products: {item?.quantity}</p>
          <div className="progress">
            <div 
              class="progress-bar" 
              role="progressbar" 
              style={{"width": "50%"}} 
              aria-valuenow="50" 
              aria-valuemin="0" 
              aria-valuemax="100">
            </div>
          </div>
        </div>
        <div className='special-link'>
          <Link >
            Add To Cart
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default SpecialCard