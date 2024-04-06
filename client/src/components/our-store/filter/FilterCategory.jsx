import './filterCategory.scss'
const FilterCategory = ({items}) => {
  return (
    <div className='filte-category'>
        <ul className='filte-category'>
          {items?.length > 0 && items?.map((item) => (
            <li key={item._id}>{item?.title}</li>
          ))}
            
        </ul>
    </div>
  )
}

export default FilterCategory