import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import {createCategory} from './../features/category/categorySlice'
import {message} from 'antd'
const AddProductCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isSuccess, isError, createdCat} = useSelector(state => state.category)
  
  useEffect(() => {
    if(isLoading){
      message.loading("Creating Brand...", 1000)
    }
    if (isError) {
      message.error("Something went wrong!!!")
    }
  }, [isLoading, isError])
  
  const schema= object({
    name: string().required("Name is Required!") 
  })

  const formic = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values))
      setTimeout(() => {
        if (isSuccess && createdCat) {
          message.success("Category added successfully!")
        }
        navigate('/admin/product-category')
      }, 2000)
      formic.resetForm(); 
    }

  })
  return (
    <div className="w-100">
      <h3 className="mb-4">Add Product Category</h3>
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
              {isLoading ? "loading..." : 'Add Product Category'}
            </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductCat