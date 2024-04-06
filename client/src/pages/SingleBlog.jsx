import Meta from '../components/Meta';
import './singleBlog.scss';
import BreadCrump from '../components/BreadCrump';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong, FaLinkedin, FaTelegram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getBlogcategories, getOneBlog } from '../features/blog/blogSlice';
import {format} from 'date-fns';

const SingleBlog = () => {
  const {id :blogId} = useParams();
  const dispatch = useDispatch();
  const {blogData, blogcategories} = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getOneBlog(blogId))
    dispatch(getBlogcategories())
  }, [])

  return (
    <>
        <Meta title='Single blog'/>
        <BreadCrump title='Single Blog'/>
        <Container class1='blog-wrapper home-wrapper-2 py-5'>
            <div className="single-blog-container">
                <div>
                    <div className="single-sidebar">
                        <h3>Search by:</h3>
                        <ul>
                            {blogcategories?.length > 0 
                            && blogcategories?.map((item) => (
                                <li key={item._id}>{item?.title}</li>
                            ))}
                    
                        </ul>
                    </div>
                </div>
                <div className="single-main">
                    <div>
                        <h2>{blogData?.title}</h2>
                    </div>
                    <div>
                        <img src="/images/blog.avif" alt="blog" />
                    </div>
                    <p
                        dangerouslySetInnerHTML={{__html:  blogData?.description}}
                    >
                    </p>
                    <div className='single-date-author'>
                            <span>{format(new Date(blogData?.createdAt), "dd MMM yyyy")}</span>
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
        </Container>
    </>
  )
}

export default SingleBlog