import { Rating } from 'react-simple-star-rating'
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoGitCompareOutline, IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";

const FeaturedCard = ({grid}) => {
  return (
        <Link to={'/'} className={`product-card gr${grid}`} >
            <div className='wishlist-card'>
                <Link to='/whishlist'>
                        <MdFavoriteBorder />
                </Link>
            </div>
            <div className="card-image">
                <img src="/images/mobile02.webp" alt="product" />
                <img src="/images/mobile.jfif" alt="product" />
            </div>
            <div className="product-card-content">
                <span className='brand'>apple</span>
                <span className='product-title'>Iphone 12 por max 128GB </span>
                <Rating ratingValue={4} size={20} initialValue={3}/>
                <p className='product-desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     </p>
                <h5 className='product-price'>$ 999</h5>
            </div>
            <div className="action-bar">
                <div className="action-items ">
                    
                    <Link to='/compare-product'>
                        <IoGitCompareOutline />
                    </Link>
                    <Link to='/'>
                        <FaRegEye />
                    </Link>
                    <Link to='/'>
                        <IoCartOutline />
                    </Link>
                </div>
            </div>
        </Link>

  )
}

export default FeaturedCard