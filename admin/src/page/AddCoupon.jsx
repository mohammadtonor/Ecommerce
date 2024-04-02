import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCoupon, resetState } from '../features/coupons/couponSlice';
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import {toast} from 'react-toastify'

const AddCoupon= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isSuccess, isError, isLoading, createdCoupon} = useSelector(state => state.coupon);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon added successfully!", { delay: 2000 })
    }
    if(isLoading){
      toast.info("Creating Coupon...", { autoClose: 1000 })
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isLoading, isError, isSuccess])

  let userSchema = object({
    name: string().required('Name is Required'),
    expiry: date().required('Expiry is Required'),
    discount: number().required('Discount is Required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: ''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(addCoupon(values));
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/coupons')
      }, 2000)
      formik.resetForm(); 
    },
  });
  return (
    <div className='w-100'>
      <h3 className="mb-4">Add Brand</h3>
      <div className="flex-grow">
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <CustomInput 
            id="name" 
            label={"Enter Coupon Name"} 
            type={"text"} 
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div className="">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mt-4"/>
          <CustomInput 
            id="expiry" 
            label={"Enter Expiry Date"} 
            type={"date"} 
            onChange={formik.handleChange('expiry')}
            onBlur={formik.handleBlur('expiry')}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry ? (
              <div className="">{formik.errors.expiry}</div>
            ) : null}
          </div>
          <div className="mt-4"/>
          <CustomInput 
            id="discount" 
            label={"Enter Discount"} 
            type={"number"} 
            onChange={formik.handleChange('discount')}
            onBlur={formik.handleBlur('discount')}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount ? (
              <div className="">{formik.errors.discount}</div>
            ) : null}
          </div>
          <button disabled={isLoading} className="add-blog-button">
            {isLoading? 'Loading' : 'Add Coupon '}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCoupon