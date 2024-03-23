import './blogs.scss';
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump'
import FilterCard from '../components/our-store/filter/FilterCard';
import FilterCategory from '../components/our-store/filter/FilterCategory';
import BlogCard from '../components/Home/BlogeCard';

const Blogs = () => {
  return (
    <>
        <Meta title='Our Blog'/>
        <BreadCrump title='Our Blog'/>
        <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="flex-wrapper">
                    <div>
                        <FilterCard title='Find By Category'>
                                <FilterCategory />
                        </FilterCard>
                    </div>

                    <div className="blog-lists">
                        <BlogCard />
                        <BlogCard />
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blogs