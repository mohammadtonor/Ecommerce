import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addCoupon, getOneCoupon, resetState, updateCoupon } from '../features/coupons/couponSlice';
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import {toast} from 'react-toastify'
import { format, parseISO } from 'date-fns';

const AddCoupon= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const couponId = location.pathname.split('/')[3];
  const isUpdating = couponId !== undefined && couponId !== 'new';
  const formatDate = (date) => {
    const [month, day, year] = new Date(date)?.toLocaleString()?.split(',')[0].split('/');
    const newData =  [year, `0${month}`, day].join('-');
    return newData.toString();
  }

  useEffect(()=> {
    if(isUpdating) {
      dispatch(resetState())
      setTimeout(()=> dispatch(getOneCoupon(couponId)), 50)
    } else {
      dispatch(resetState())
    }
  }, [couponId]);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    updatedCoupon,
    message,
  } = useSelector((state) => state.coupon);
  
  const {
    couponData,
  } = useSelector((state) => state.coupon);

  useEffect(() => {
    if ((isSuccess && createdCoupon) || (isSuccess && updatedCoupon )) {
      toast.success(`Coupon ${isUpdating ? 'Updated' : 'Created'} successfully!`, { delay: 2000 })
    }
    if (isError) {
      toast.error(message)
    }
  }, [isError, isSuccess, updatedCoupon, createdCoupon]);

  

  let userSchema = object({
    name: string().required('Name is Required'),
    expiry: date().required('Expiry is Required'),
    discount: number().required('Discount is Required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponData?.name ||'',
      expiry: formatDate(couponData?.expiry) ||'',
      discount: couponData?.discount ||'',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (isUpdating) {
        const data = { id: couponId, couponData: values}
        dispatch(updateCoupon(data));
      } else {
        dispatch(addCoupon(values));
      }
      setTimeout(() => {
        if (!isError) {
          navigate('/admin/coupons')
          formik.resetForm(); 
        }
      }, 1000)
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