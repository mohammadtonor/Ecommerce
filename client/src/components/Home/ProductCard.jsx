import { Rating } from 'react-simple-star-rating'
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoGitCompareOutline, IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { addToWishList } from '../../features/products/productSlice';

const FeaturedCard = ({data, grid}) => {
    const dispatch = useDispatch();
  return (
        <div className={`gr${grid}`} >
            <Link className={`product-card  position-relative ${grid == 4 && 'gr4'}`}>
                <div className='wishlist-card'>
                    <button className='btn p-0 left-2' type='button' onClick={() => dispatch(addToWishList(data._id))}>
                        <MdFavoriteBorder />
                    </button>
                </div>
                <div className="card-image">
                    <img src={data?.images[0]?.url} alt="product" />
                    <img src="/images/mobile.jfif" alt="product" />
                </div>
                <div className="product-card-content">
                    <span className='brand'>{data?.brand}</span>
                    <span className='product-title'>{data?.title}</span>
                    <Rating ratingValue={4} size={20} initialValue={data?.totalRating}/>
                    <p className='product-desc'
                        dangerouslySetInnerHTML={{__html:  data?.description}}
                    >
                    </p>
                    <h5 className='product-price'>$ {data?.price}</h5>
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
        </div>

  )
}

export default FeaturedCard