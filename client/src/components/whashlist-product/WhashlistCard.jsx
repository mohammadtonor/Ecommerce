import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../features/products/productSlice";
import { getProductWhishlist } from "../../features/users/userSlice";

const WhashlistCard = ({item}) => {
  const dispatch = useDispatch();

  const removeWhashlist = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => dispatch(getProductWhishlist()), 500)
  }

  return (
    <div className='whashlist-card'>
      <div className='product-card__image'>
        <button className='btn' onClick={() => removeWhashlist(item?._id)}>
          <CiTrash />
        </button>
        <img src={item?.images[0]?.url} alt='product' />
      </div>
      <div className='product-card__content'>
        <span className='product-card__title'>{item?.title}</span>
        <span className='product-card__price'>$ {item?.price}</span>
      
      </div>
    </div>
  )
}

export default WhashlistCard