import './blogs.scss';
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump'
import FilterCard from '../components/our-store/filter/FilterCard';
import FilterCategory from '../components/our-store/filter/FilterCategory';
import BlogCard from '../components/Home/BlogeCard';
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getBlogcategories, getBlogs } from '../features/blog/blogSlice';


const Blogs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getBlogcategories());
      dispatch(getBlogs());
  }, [])
  const {blogs, blogcategories} = useSelector(state => state.blogs)

  return (
    <>
        <Meta title='Our Blog'/>
        <BreadCrump title='Our Blog'/>
        <Container class1="blog-wrapper home-wrapper-2 py-5">
            <div className="flex-wrapper">
                <div>
                    <FilterCard title='Find By Category'>
                            <FilterCategory items={blogcategories}/>
                    </FilterCard>
                </div>
                <div className="blog-lists">
                    { blogs?.length > 0 &&  blogs?.map(blog => (
                        <BlogCard item={blog} key={blog._id}/>
                    ))}                    
                </div>
            </div>
        </Container>
    </>
  )
}

export default Blogs