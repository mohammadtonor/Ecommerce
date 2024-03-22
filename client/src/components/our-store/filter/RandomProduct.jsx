import { Rating } from 'react-simple-star-rating'
import './randomProduct.scss'

const RandomProduct = () => {
  return (
    <div className='random-product'>
        <div className='random-card'>
            <img src="/images/watch.jfif" alt="product" />
            <div className='random-card-content'>
                <h5>Kids Hand Watch bild 10 colored</h5>
                <Rating ratingValue={4} size={20} initialValue={3}/>
                <p>$ 300</p>
            </div>
        </div>
        <div className='random-card'>
            <img src="/images/watch.jfif" alt="product" />
            <div className='random-card-content'>
                <h5>Kids Hand Watch bild 10 colored</h5>
                <Rating ratingValue={4} size={20} initialValue={3}/>
                <p>$ 300</p>
            </div>
        </div>
    </div>
  )
}

export default RandomProduct