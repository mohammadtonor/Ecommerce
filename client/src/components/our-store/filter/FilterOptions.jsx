import './filterOptions.scss';

const FilterOptions = () => {
  return (
    <div className='filter-options'>
        <div className='filter-options-item'>
            <h5>Avialability</h5>
            <div className="filter-form">
                <input
                    className='form-check-input'
                    type='checkbox'
                    id=''
                />
                <label>In Stock(1)</label>
            </div>
            <div className="filter-form">
                <input
                    className='form-check-input'
                    type='checkbox'
                    id=''
                />
                <label>In Stock(1)</label>
            </div>
        </div>
        <div className='filter-options-item'>
            <h5>Price</h5>
            <div className='filter-input-price'>
                <label htmlFor="">From</label>
                <input 
                    type="number" 
                    placeholder='feom'
                    className='form-control'
                    value={0}
                    min={1}
                    max={1000000}
                />
                <label htmlFor="">To</label>
                <input 
                    type="number" 
                    placeholder='feom'
                    className='form-control'
                    value={10}
                    min={1}
                    max={1000000}
                />
            </div>
        </div>
        <div className='filter-options-item'>
            <h5>Colors</h5>
            <div className='filter-colors'>
                <ul>
                    <li style={{backgroundColor: 'red'}}></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <div className='filter-options-item'>
            <h5>ُSizes</h5>
            <div className="filter-form">
                <input
                    className='form-check-input'
                    type='checkbox'
                    id=''
                />
                <label>S (1)</label>
            </div>
            <div className="filter-form">
                <input
                    className='form-check-input'
                    type='checkbox'
                    id=''
                />
                <label>M (1)</label>
            </div>
            <div className="filter-form">
                <input
                    className='form-check-input'
                    type='checkbox'
                    id=''
                />
                <label>L(1)</label>
            </div>
            <div className="filter-form">
                <input
                    className='form-check-input'
                    type='checkbox'
                    id=''
                />
                <label>XL(1)</label>
            </div>
        </div>
    </div>
  )
}

export default FilterOptions