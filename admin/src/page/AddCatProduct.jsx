import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import {createCategory, getOnePCategory, resetState, updatePCategory} from './../features/category/categorySlice'
import {message} from 'antd';
import {toast} from 'react-toastify'

const AddProductCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, createdCat } =useSelector((state) => state.category);
  const location = useLocation();
  const pCatId = location.pathname.split('/')[3];
  const isUpdating = pCatId !== undefined && pCatId !== 'new';

  

  useEffect(()=> {
    if(isUpdating) {
      dispatch(resetState())
      setTimeout(() => 
        dispatch(getOnePCategory(pCatId))
      ,1)
    } else {
      dispatch(resetState())
    }
  },[pCatId] )

  const { catName, updatedCat } = useSelector((state) => state.category);

  useEffect(() => {
    if (isSuccess && (createdCat || updatedCat)) {
      message.success(`Category ${isUpdating ? 'Updated': 'Created'} successfully!`)
    }
    if(isLoading && createdCat){
      toast.loading("Creating Brand...", {duration: 1000})
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isLoading, isError, isSuccess,createdCat, updatedCat])
  
  const schema= object({
    name: string().required("Name is Required!") 
  })

  const formic = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: catName || ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (isUpdating) {
        const data= {id: pCatId, category: values}
        dispatch(updatePCategory(data))
      } else {
        dispatch(createCategory(values))
      }
      setTimeout(() => {
        navigate('/admin/product-category')
        formic.resetForm(); 
      }, 2000)
    }

  })
  return (
    <div className="w-100">
      <h3 className="mb-4">{isUpdating ? 'Edit': 'Create'} PCategory</h3>
      <div className="flex-grow">
        <form action="" className="w-100" onSubmit={formic.handleSubmit}>
          <CustomInput 
            id="name" 
            label={"Enter Blog Title"} t
            type={"text"} 
            onChange={formic.handleChange('name')}
            onBlur={formic.handleBlur('name')}
            val={formic.values.name}  
          />
            <div className="error">
            {formic.touched.name && formic.errors.name ? (
              <div className="">{formic.errors.name}</div>
            ) : null}
          </div>
          <button 
            disabled={isLoading}
            className="add-blog-button">
              {isLoading ? "loading..." : `${isUpdating ? 'Edit' : 'Create'}  PCategory`}
            </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductCat