import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {object, string,} from 'yup';
import { createColor } from '../features/colors/ColorSlice';
import { useFormik } from 'formik';

const AddColor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const location = useLocation();
  const orginLabel = location.pathname.split('/')[2]
  const label = `${orginLabel[0].toUpperCase()}${orginLabel.slice(1 , orginLabel.length -1)}`
  const {isLoading, isError, isSuccess, message, createdColor} = useSelector(state => state.color)

  useEffect(() => {
    if(isLoading){
      toast.warning("Creating Color...", {autoClose: 1000}) 
    }
    if(isError){
      toast.error(message)
    }
  }, [isError, isLoading])

  const sshema = object({
    title: string().required('Title is required'),
    
  })

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: sshema,
    onSubmit: (values) => {
      dispatch(createColor(values))
      setTimeout(() => {
        if (isSuccess) {
          toast.success('Color added successfully')
          navigation('/admin/colors')
        }
      }, 2000)
      formik.resetForm()
    }
  })

  return (
    <div className='w-100'>
      <h3 className="mb-4">Add {label}</h3>
      <div className="flex-grow">
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <CustomInput 
            id="title" 
            val={formik.values.title}
            label={"Enter Blog Title"} 
            type={"text"} 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div className="">{formik.errors.title}</div>
            ) : null}
          </div>
          <button 
            disabled={isLoading}
            className="add-blog-button">
              {isLoading ? 'Creating...': `Add ${label}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddColor