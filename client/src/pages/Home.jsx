import React from 'react';
import HomeBanner from '../components/Home/HomeBanner';
import HomeServices from '../components/Home/HomeServices';
import HomeCategories from '../components/Home/HomeCategories';
import HomeMarquee from '../components/Home/HomeMarquee';
import BlogeCard from '../components/Home/BlogeCard';
import FeaturedCard from '../components/Home/ProductCard';
import SpecialCard from '../components/Home/SpecialCard';
import FamousCard from '../components/Home/FamousCard';

const Home = () => {
    return (
        <>
            <section className='home-wrapper-1 py-5'>
                <HomeBanner /> 
            </section>
            <section className='home-wrapper-2 py-5'>
                <HomeServices />
            </section>
            <section className='home-wrapper-3 py-5'>
                <HomeCategories />
            </section>
            <section className='featured-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <h1 className='py-2 blog-heading'>Featured Products</h1>
                    <div className="product-flex">
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                    </div>
                </div>   
            </section>
            <section className="famous-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="famous-flex">
                        <FamousCard imageSrc={'/images/spaeker04.jpg'}/>
                        <FamousCard imageSrc={'/images/spaeker.jfif'}/>
                        <FamousCard imageSrc={'/images/spaeker.jfif'}/>
                        <FamousCard imageSrc={'/images/spaeker.jfif'}/>
                    </div>
                </div>
            </section>
            <section className='popular-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <h1 className='py-2 blog-heading'>Popular Products</h1>
                    <div className="product-flex">
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                        <FeaturedCard />
                    </div>
                </div>   
            </section>
            <section className="special-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <h1 className="py-2 special-heading">Special Offers</h1>
                    <div className="special-flex">
                        <SpecialCard />
                        <SpecialCard />
                        <SpecialCard />
                    </div>
                </div>
            </section>
            <section className='home-wrapper-2 py-5'>
                <HomeMarquee />
            </section>
            <section className='blog-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <h1 className='py-2 blog-heading'>Latest Blogs</h1>
                    <div className="blog-flex">
                        <BlogeCard />
                        <BlogeCard />
                        <BlogeCard />
                        <BlogeCard />
                    </div>
                </div>   
            </section>
            
        </>
    );
};

export default Home;