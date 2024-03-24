import Meta from '../components/Meta';
import './singleBlog.scss';
import BreadCrump from '../components/BreadCrump';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong, FaLinkedin, FaTelegram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const SingleBlog = () => {
  return (
    <>
        <Meta title='Single blog'/>
        <BreadCrump title='Single Blog'/>
        <div className='blog-wrapper home-wrapper-2 py-5'>
            <div className='container-xxl'>
                <div className="single-blog-container">
                    <div>
                        <div className="single-sidebar">
                            <h3>Search by:</h3>
                            <ul>
                                <li>new brand</li>
                                <li>review</li>
                                <li>top model</li>
                                <li>top brand</li>
                            </ul>
                        </div>
                    </div>
                    <div className="single-main">
                        <div>
                            <h2>Blog title</h2>
                        </div>
                        <div>
                            <img src="/images/blog.avif" alt="blog" />
                        </div>
                        <p>
                            lurem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis, justo ac
                            consectetur tincidunt, nunc purus ultricies nunc, nec tincidunt nunc turpis nec
                            mauris. Sed nec elit in nunc tincidunt tincidunt. Quisque nec odio at elit
                        </p>
                        <div className='single-date-author'>
                                <span>11 mar 2024</span>
                                <span>Author</span>
                            
                        </div>
                        <div className='single-social'>
                            <div className=''>
                                <FaArrowLeftLong />
                                <Link to='/blogs'>Back to Blogs</Link>
                            </div>
                            <div>
                                <FaFacebookSquare />
                                <FaTelegram />
                                <FaLinkedin />
                            </div>
                        </div>
                        <div className="single-form-comment">
                            <h3>Leave a comment</h3>
                            <form>
                                <div className="form-group-top">
                                    <input type="text" id="name" placeholder='Enter a Name'/>
                                    <input type="email" id="email" placeholder='Enter a Email'/>
                                </div>
                                <div className="form-group">
                                    <textarea name="comment" placeholder='Enter a Comment' id="comment" cols="30" rows="5"></textarea>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SingleBlog