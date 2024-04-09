import { Rating } from 'react-simple-star-rating'
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoGitCompareOutline, IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { addToWishList } from '../../features/products/productSlice';

const FeaturedCard = ({items, grid}) => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  return (
        <div className={`gr${grid}`} >
            <Link
                //to={`/products/${items?._id}`}
                className={`product-card  position-relative ${grid === 4 ? 'gr4': ''}`}>
                <div className='wishlist-card'>
                    <button className='btn p-0 left-2' type='button' onClick={() => dispatch(addToWishList(items._id))}>
                        <MdFavoriteBorder />
                    </button>
                </div>
                <div className="card-image">
                    <img src={items?.images[0]?.url} alt="product" />
                    <img src="/images/mobile.jfif" alt="product" />
                </div>
                <div className="product-card-content">
                    <span className='brand'>{items?.brand?.title}</span>
                    <span className='product-title'>{items?.title}</span>
                    <Rating ratingValue={4} size={20} initialValue={items?.totalRating}/>
                    {/* <p className='product-desc'
                        dangerouslySetInnerHTML={{__html:  items?.description}}
                    >
                    </p> */}
                    <h5 className='product-price'>$ {items?.price}</h5>
                </div>
                <div className="action-bar">
                    <div className="action-items ">
                        <Link to='/compare-product'>
                            <IoGitCompareOutline />
                        </Link>
                        <Link to={`/products/${items?._id}`}>
                            <FaRegEye onClick={() => navigate(`/products/${items?._id}`)}/>
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