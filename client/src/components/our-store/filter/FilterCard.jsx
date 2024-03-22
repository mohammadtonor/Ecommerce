import './filterCard.scss'

const FilterCard = ({children, title}) => {
  return (
    <div className="filter-card">
        <h3 className='filter-title'>{title}</h3>
        {children}
    </div>
  )
}

export default FilterCard