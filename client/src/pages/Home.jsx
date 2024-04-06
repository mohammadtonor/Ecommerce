import React from 'react';
import HomeBanner from '../components/Home/HomeBanner';
import HomeServices from '../components/Home/HomeServices';
import HomeCategories from '../components/Home/HomeCategories';
import HomeMarquee from '../components/Home/HomeMarquee';
import BlogeCard from '../components/Home/BlogeCard';
import FeaturedCard from '../components/Home/ProductCard';
import SpecialCard from '../components/Home/SpecialCard';
import FamousCard from '../components/Home/FamousCard';
import Container from '../components/Container';
import ProductCard from './../components/Home/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBlogs } from '../features/blog/blogSlice';
import { getProducts } from '../features/products/productSlice';

const Home = () => {
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state.blogs.blogs);
    const productState = useSelector((state) => state.product.products)

    useEffect(() => {
        dispatch(getBlogs());
        dispatch(getProducts());
    }, [])

    return (
        <>
            <Container class1='home-wrapper-1 py-5'>
                <HomeBanner /> 
            </Container>
            <Container class1='home-wrapper-2 py-5'>
                <HomeServices />
            </Container>
            <Container class1='home-wrapper-3 py-5'>
                <HomeCategories />
            </Container>
            <Container class1='featured-wrapper py-5 home-wrapper-2'>
                    <h1 className='py-2 blog-heading'>Featured Products</h1>
                    <div className="product-flex">
                        {productState?.map(product => {
                            if(product.tag === 'featured') {
                                return <ProductCard data={product} key={product._id}/>
                            }
                        })}
                        
                    </div>
            </Container>
            <Container class1="famous-wrapper home-wrapper-2 py-5">
                    <div className="famous-flex">
                        {productState?.map((product, index) => {
                            if(index < 4) {
                                return (
                                    <FamousCard
                                        imageSrc={'/images/spaeker04.jpg'}
                                        category={'Blue Screan'}
                                        title='Smart watch Series 7'
                                        price='From $100 or 12.5/month'
                                    />
                                )
                            }
                        })}
                    </div>
            </Container>
            <Container class1='popular-wrapper py-5 home-wrapper-2'>
                <h1 className='py-2 blog-heading'>Popular Products</h1>
                <div className="product-flex">
                    {productState?.length > 0 && productState.map((product, index) => {
                        if(index < 5) {
                            return <FeaturedCard  data={product} key={product._id}/>
                        }
                    })}
                    <FeaturedCard />
                </div>
            </Container>
            <Container class1="special-wrapper py-5 home-wrapper-2">
                <h1 className="py-2 special-heading">Special Offers</h1>
                <div className="special-flex">
                    <SpecialCard />
                    <SpecialCard />
                    <SpecialCard />
                </div>
            </Container>
            <Container class1='home-wrapper-2 py-5'>
                <HomeMarquee />
            </Container>
            <Container class1='blog-wrapper py-5 home-wrapper-2'>
                <h1 className='py-2 blog-heading'>Latest Blogs</h1>
                <div className="blog-flex">
                    {blogState?.length > 0 && blogState.map((item, index) => {
                            if(index < 3) {
                                return <BlogeCard key={item._d} item={item}/>
                            } 
                        })}
                    
                    </div>
            </Container>
            
        </>
    );
};

export default Home;