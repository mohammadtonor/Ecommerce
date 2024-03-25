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

const Home = () => {
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
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
            </Container>
            <Container class1="famous-wrapper home-wrapper-2 py-5">
                    <div className="famous-flex">
                        <FamousCard
                            imageSrc={'/images/spaeker04.jpg'}
                            category={'Blue Screan'}
                            title='Smart watch Series 7'
                            price='From $100 or 12.5/month'
                        />
                        <FamousCard 
                            imageSrc={'/images/spaeker.jfif'}
                            category={'Blue Screan'}
                            title='Smart watch Series 7'
                            price='From $100 or 12.5/month'
                        />
                        <FamousCard 
                            imageSrc={'/images/spaeker.jfif'}
                            category={'Blue Screan'}
                            title='Smart watch Series 7'
                            price='From $100 or 12.5/month'
                        />
                        <FamousCard 
                            imageSrc={'/images/spaeker.jfif'}
                            category={'Blue Screan'}
                            title='Smart watch Series 7'
                            price='From $100 or 12.5/month'
                        />
                    </div>
            </Container>
            <Container class1='popular-wrapper py-5 home-wrapper-2'>
                <h1 className='py-2 blog-heading'>Popular Products</h1>
                <div className="product-flex">
                    <FeaturedCard />
                    <FeaturedCard />
                    <FeaturedCard />
                    <FeaturedCard />
                    <FeaturedCard />
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
                    <BlogeCard />
                    <BlogeCard />
                    <BlogeCard />
                    <BlogeCard />
                    </div>
            </Container>
            
        </>
    );
};

export default Home;