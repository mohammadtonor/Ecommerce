import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBrand } from '../features/brands/BrandSlice';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isSuccess, isError, isLoading, createdBrand} = useSelector(state => state.brand);

  useEffect(() => {
    if(isLoading){
      message.loading("Creating Brand...")
    }
    if (isError) {
      message.error("Something went wrong!!!")
    }
  }, [isLoading, isError])

  let userSchema = object({
    title: string().required('Title is Required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addBrand(values));
      setTimeout(() => {
        if (isSuccess && createdBrand) {
          message.success("Product added successfully!")
        }
        navigate('/admin/brands')
      }, 3000)
      formik.resetForm(); 
    },
  });
  return (
    <div className='w-100'>
      <h3 className="mb-4">Add Brand</h3>
      <div className="flex-grow">
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <CustomInput 
            id="title" 
            label={"Enter Blog Title"} 
            type={"text"} 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div className="">{formik.errors.title}</div>
            ) : null}
          </div>
          <button disabled={isLoading} className="add-blog-button">
            {isLoading? 'Loading' : 'Add Brand '}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand