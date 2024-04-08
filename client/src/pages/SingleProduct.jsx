import Meta from '../components/Meta';
import BreadCrump from '../components/BreadCrump';
import './singleProduct.scss';
import { Rating } from 'react-simple-star-rating'
import ProductCard from '../components/Home/ProductCard';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdContentCopy } from "react-icons/md";
import 'react-medium-image-zoom/dist/styles.css'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOneProduct } from '../features/products/productSlice';
import { addToCart, getPrroductCarts } from '../features/users/userSlice';


const SingleProduct = () => {
  const [createReview, setCreateReview] = useState(false);
  const [color, setColor] = useState('')
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false)
  const dispatch = useDispatch();
  const {id: prodId} = useParams(); 
  const { productData } = useSelector(state => state.product);
  const cartState = useSelector(state => state.auth?.cartProducts);

  useEffect(() => {
    dispatch(getOneProduct(prodId))
    dispatch(getPrroductCarts());
  }, [])

  useEffect(() => {
    Array.isArray(cartState) &&
    cartState?.forEach(item => {
        if(prodId === item?.productId._id) {
            setAddedToCart(true)
        }
    })
  }, []);
  const copyTo = (copyText) => {
    navigator.clipboard.writeText(copyText);
  } 
  
  const handleAddToCart = (id) => {
    if(addedToCart) navigate('/cart')
    const totalPrice = quantity * parseInt(productData?.price)
    const data = {
        productId: id, 
        quantity: parseInt(quantity), 
        price: totalPrice,
        color,
    };
    dispatch(addToCart(data));
  }

  return (
    <>
        <Meta title='Single Products'/>
        <BreadCrump title='Single Products'/>
        <Container class1='home-wrapper-2 py-5'>
            <div className='main-product-container'>
                <div className='product-image'>
                    <div className='main-image'>
                        <Zoom >
                        <img
                            alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                            src={productData?.images[0]?.url}
                            width="500"
                            />
                        </Zoom>
                    </div>
                    <div className='other-image'>
                        {productData?.images.map((image, index) => (
                             <div>
                                <img src={image?.url} alt='watch'/>
                            </div>    
                        ))}
                    </div>
                </div>
                <div className='product-content'>
                    <h5>{productData?.title}</h5>
                    <p>$ {productData?.price}</p>
                    <div className='product-rating'>
                        <Rating ratingValue={4} size={20} initialValue={productData?.totalRating}/>
                        ({productData?.totalRating} Reviews)
                    </div>
                    <div className='product-type'>
                        <h5>Type:</h5> 
                        <span>Headphone</span>
                    </div>
                    <div className='product-type'>
                        <h5>brand:</h5>
                        <span>{productData?.brand?.title}</span>
                    </div>
                    <div className='product-type'>
                        <h5>Category:</h5>
                        <div className="product-category">
                            <span>{productData?.category?.name}</span>
                            <span>Mobile</span>
                            <span>Headphone</span>
                        </div>
                    </div>
                    <div className='product-type'>
                        <h5>Tags:</h5> 
                        <div className='product-tags'>{productData?.tag}</div>
                    </div>
                    <div className='product-type'>
                        <h5>SKU:</h5>
                        <span>SKU34532</span>
                    </div>
                    <div className='product-type'>
                        <h5>Availability</h5>
                        <span>In stock</span>
                    </div>
                    <div className='product-size'>
                        <h5>Sizes:</h5>
                        <div className='product-size-item'>
                            <span>S</span>
                            <span>L</span>
                        </div>
                    </div>
                    {!addedToCart && 
                    <div className='product-color'>
                        <h5>Color</h5>
                        <div className='product-color-item'>
                            {productData?.colors?.map(color => (
                                <span onClick={() => {
                                    setColor(color?._id)}}>
                                </span>
                            ))}
                        </div>
                    </div>
                    }
                    <div className='product-quantity'>
                        {!addedToCart && 
                            <div className='product-quantity-item'>
                                Quantity
                                <input 
                                    type='number'
                                    name='quantity' 
                                    min={1} 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(e.target.value)}
                                    />
                            </div>
                        }
                        <div className='product-quantity-button'>
                            <button 
                                className='btn btn-primary'
                                onClick={() => handleAddToCart(productData?._id)}
                            >
                                {addedToCart ? 'Go to Cart' : 'Add to cart'}
                            </button>
                            <button className='btn btn-primary'>Buy Now</button>
                        </div>
                        
                    </div>
                    <div className='product-item-wishlist'>
                            <Link>
                                <FaRegHeart />
                                <span>Add to Wishlist</span>
                            </Link>
                            <Link>
                                <IoGitCompareOutline />
                                <span>Add to Compare</span>
                            </Link>
                    </div>
                    <div className='product-accordian'>
                        <div className='product-accordian__header'>
                            <LiaShippingFastSolid />
                            Shipping
                        </div>
                        <div className='product-accordian__body'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit 
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                        </div>
                    </div>
                    <div className='product-accordian'>
                        <div className='product-accordian__header'>
                            <MdContentCopy  />
                            Shipping
                        </div>
                        <a onClick={() => copyTo("https://res.cloudinary.com/dajdunc2w/image/upload/v1711308011/watch_qxcpb2.jpg")} className='product-accordian__body'>
                            copy to clipboard
                        </a>         
                    </div>
                    <div className='product-accordian'>
                        <div className='product-accordian__header'>
                            <LiaShippingFastSolid />
                            Shipping
                        </div>
                        <div className='product-accordian__body'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit 
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        <Container class1='description-wrapper py-3 home-wrapper-2'>
            <h5>Description</h5>
            <div className="description-container">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in  
                </p> 
            </div>
        </Container>
        <Container class1='review-wrapper home-wrapper-2 py-5'>
            <h5>Reviews</h5>
            <div className='review-card'>
                <h3>Customer Revies</h3>
                <div className='review-card-item'>
                    <div className='review-card-item-top'>
                        <Rating ratingValue={4} size={20} initialValue={3}/>
                        <span>Based on 2 reviews</span>
                    </div>
                    <span className='review-card-item__write' onClick={() => setCreateReview(!createReview)}>Write a Review</span>
                </div>
                {createReview && (

                
                <form>
                    <h4>write a Review</h4>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' placeholder='Enter your name'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Enter your email'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rating'>Rating</label>
                        <Rating ratingValue={4} size={20} initialValue={3}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='title'>Review title</label>
                        <input type='text' id='review-title' name='review-title' placeholder='Enter your title '/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='review'>Review</label>
                        <textarea name='review' id='review' cols='30' rows='10' placeholder='Enter your review'></textarea>
                    </div>
                    <div className='form-group form-button'>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
                )}

                <div className='review-card-item-view'>
                    <div className='review-card-item-view__top'>
                        <div className='review-card-item-view__top'>
                            <h5>John Doe</h5>
                            <Rating ratingValue={4} size={20} initialValue={3}/>
                            <span>Dec 12 2024</span>
                        </div>
                    </div>
                    <div className='review-card-item-view__bottom'>
                        <h5>Good Product</h5>
                        <p>
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>
                <div className='review-card-item-view'>
                    <div className='review-card-item-view__top'>
                        <div className='review-card-item-view__top'>
                            <h5>John Doe</h5>
                            <Rating ratingValue={4} size={20} initialValue={3}/>
                            <span>Dec 12 2024</span>
                        </div>
                    </div>
                    <div className='review-card-item-view__bottom'>
                        <h5>Good Product</h5>
                        <p>
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <div className='review-card-item-view__bottom__reply'>
                            <h5>Reply</h5>
                            <p>
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='review-card-item-view'>
                    <div className='review-card-item-view__top'>
                        <div className='review-card-item-view__top'>
                            <h5>John Doe</h5>
                            <Rating ratingValue={4} size={20} initialValue={3}/>
                            <span>Dec 12 2024</span>
                        </div>
                    </div>
                    <div className='review-card-item-view__bottom'>
                        <h5>Good Product</h5>
                        <p>
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
        <Container class1='pupular-wrapper home-wrapper-2 py-5'>
            <h5>Popular Products</h5>
            <div className='popular-product-container'>
                <div className='popular-product-card'>
                    <ProductCard grid={1}/>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </Container>
    </>
  )
}

export default SingleProduct