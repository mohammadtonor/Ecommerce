import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump'
import FilterCard from '../components/our-store/filter/FilterCard'
import FilterCategory from '../components/our-store/filter/FilterCategory'
import FilterOptions from '../components/our-store/filter/FilterOptions'
import FilterTags from '../components/our-store/filter/FilterTags'
import RandomProduct from '../components/our-store/filter/RandomProduct'
import SortOptions from '../components/our-store/filter/SortOptians'
import { useState } from 'react'
import ProductCard from './../components/Home/ProductCard';
import Container from '../components/Container'

const OurStore = () => {
  const [grid, setGrid] = useState(1);
 
  const gridSetter = (i) => {
    setGrid(i);
  }
  return (
    <>  
        <Meta title='Our Store'/>
        <BreadCrump title='Our Store'/>
        <Container class1="store-wrapper home-wrapper-2 py-5">
            <div className='store-flex'>
                <div className="store-filter">
                    <FilterCard title='Filter By Category'>
                        <FilterCategory />
                    </FilterCard>
                    <FilterCard title='filter by '>
                        <FilterOptions />
                    </FilterCard>
                    <FilterCard title='Products tags'>
                        <FilterTags />
                    </FilterCard>
                    <FilterCard title='Random products'>
                        <RandomProduct />
                    </FilterCard>
                </div>
                <div className="srore-prod-lists">
                    <SortOptions gridSetter={gridSetter}/>
                    <div className={`flex-list-products`}>
                        <ProductCard grid={grid}/>
                        <ProductCard grid={grid}/>
                        <ProductCard grid={grid}/>
                        <ProductCard grid={grid}/>
                    </div>
                </div>
            </div>
        </Container>
    </>
  )
}

export default OurStore