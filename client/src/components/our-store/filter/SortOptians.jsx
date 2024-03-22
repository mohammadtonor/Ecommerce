import './sortOptions.scss'
import { IoGridOutline } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { BsGrid1X2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";


const SortOptions = ({gridSetter}) => {
  return (
    <div className='sort-filter'>
      <div className='filter-left'>
        <span>Sort By:</span>
        <select className='sort-options'>
          <option>Price, low to hight</option>
          <option>Price, hight to low</option>
          <option>Date, old to now</option>
          <option>Date, now to old</option>
        </select>
      </div>
      <div className='filter-right'>
        <span>21 Product</span>
        <IoGridOutline onClick={() => gridSetter(1)} size={33}/>
        <CgMenuGridR onClick={() => gridSetter(2)} size={33}/>
        <BsGrid1X2 onClick={() => gridSetter(3)} size={33}/>
        <GiHamburgerMenu onClick={() => gridSetter(4)} size={33}/>
      </div>
    </div>
  )
}

export default SortOptions