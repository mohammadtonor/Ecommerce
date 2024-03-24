import Meta from '../components/Meta';
import BreadCrump from '../components/BreadCrump';
import './singleProduct.scss';
import { Rating } from 'react-simple-star-rating'
import ProductCard from '../components/Home/ProductCard';
import { useState } from 'react';

const SingleProduct = () => {
  const [createReview, setCreateReview] = useState(false);
  return (
    <>
        <Meta title='Single Products'/>
        <BreadCrump title='Single Products'/>
        <div className='home-wrapper-2 py-5'>
            <div className='container-xxl'>
                <div className='main-product-container'>
                    <div className='product-image'>
                        <img src='https://via.placeholder.com/700' alt='product'/>
                    </div>
                    <div className='product-content'>
                        <h5>Kids HedsPhone Bulk 10 P colored for students</h5>
                        <p>$100</p>
                        <div className='product-rating'>
                            <Rating ratingValue={4} size={20} initialValue={3}/>
                            (4 Reviews)
                        </div>
                        <div className='product-type'>
                            <h5>Type:</h5> 
                            <span>Headphone</span>
                        </div>
                        <div className='product-type'>
                            <h5>brand:</h5>
                            <span>Headphone</span>
                        </div>
                        <div className='product-type'>
                            <h5>Category:</h5>
                            <div className="product-category">
                                <span>Headphone</span>
                                <span>Mobile</span>
                                <span>Headphone</span>
                            </div>
                        </div>
                        <div className='product-type'>
                            <h5>Tags:</h5> 
                            <div className='product-tags'>Headphone</div>
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
                        <div className='product-color'>
                            <h5>Color</h5>
                            <div className='product-color-item'>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className='product-quantity'>
                            <div className='product-quantity-item'>
                                Quantity
                                <input type='number' value='1'/>
                            </div>
                            <div className='product-quantity-button'>
                                <button className='btn btn-primary'>Add to Cart</button>
                                <button className='btn btn-primary'>Buy Now</button>
                            </div>
                            
                        </div>
                        <div className='product-item-wishlist'>
                                <div>
                                    <i className='fa fa-heart'></i>
                                    <span>Add to Wishlist</span>
                                </div>
                                <div>
                                    <i className='fa fa-heart'></i>
                                    <span>Add to Compare</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className='description-wrapper py-3 home-wrapper-2'>
            <div className='container-xxl'>
                <h5>Description</h5>
                <div className="description-container">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure dolor in  
                    </p> 
                </div>
            </div>
        </section>
        <section className='review-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl'>
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
            </div>
        </section>
        <section className='pupular-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl'>
                <h5>Popular Products</h5>
                <div className='popular-product-container'>
                    <div className='popular-product-card'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default SingleProduct