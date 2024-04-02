import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addBrand, getBrandById, resetState, updateBrand } from '../features/brands/BrandSlice';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import {toast} from 'react-toastify'
const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const brandId = location.pathname.split('/')[3];
  const newbrand = useSelector(state => state.brand);
  const isUpdated = brandId !== undefined && brandId !== 'new';
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    isUSuccess,
    brandTitle,
    updatedBrand,
  } = newbrand;

  useEffect(()=> {
    if (isUpdated) {
      dispatch(getBrandById(brandId));
    } else {
      dispatch(resetState());
    }
  } , [brandId]);

  useEffect(() => {
    if ((isSuccess && createdBrand) || (updatedBrand && isUSuccess)) {
      toast.success(
        `Brand ${isUpdated ? 'updated' : 'added'} successfully!`
        , { autoClose: 2000, delay: 1500, })
    }
    if(isLoading && !isUpdated){
      toast( `Pending please wait...`, { autoClose: 1000 })
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isLoading, isError, isSuccess, isUSuccess])
   
  let userSchema = object({
    title: string().required('Title is Required'),
  });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandTitle,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if(brandId !== undefined && brandId !== 'new') {
        const data = { id: brandId, brandData: values}
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(addBrand(values)); 
        formik.resetForm(); 
      }
      setTimeout(() => {
        navigate('/admin/brands')
        dispatch(resetState())
      }, 2000)
    },
  });

  return (
    <div className='w-100'>
      <h3 className="mb-4">{brandId !== undefined && brandId !== 'new'? 'Edit' : 'Add'} Brand</h3>
      <div className="flex-grow">
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <CustomInput 
            id="title" 
            label={"Enter Blog Title"} 
            type={"text"} 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            defVal={brandTitle}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div className="">{formik.errors.title}</div>
            ) : null}
          </div>
          <button disabled={isLoading} className="add-blog-button">
            {isLoading? 'Loading' : `${brandId !== undefined && brandId !== 'new'? 'Edit' : 'Add'}`} Brand
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand