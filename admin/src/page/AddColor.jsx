import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CustomInput from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {object, string,} from 'yup';
import { createColor, getOneColor, resetState, updateColor } from '../features/colors/ColorSlice';
import { useFormik } from 'formik';

const AddColor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const location = useLocation();
  const orginLabel = location.pathname.split('/')[2]
  const colorId = location.pathname.split('/')[3]
  const label = `${orginLabel[0].toUpperCase()}${orginLabel.slice(1 , orginLabel.length -1)}`
  const isUpdating = colorId !== undefined && colorId !== 'new';

  useEffect(() => {
    if(isUpdating){
      dispatch(resetState())
      setTimeout(() => {
        dispatch(getOneColor(colorId))
      }, 100)
    } else {
      dispatch(resetState())
    }
  }, [colorId])

  const {
    isLoading,
    isError,
    isSuccess,
    message,
    createdColor,
    colorTitle,
    updatedColor,
  } = useSelector((state) => state.color);

  useEffect(() => { 
    if((isLoading && createdColor) || (isLoading && updatedColor)){
      toast.warning(`Color ${isUpdating ? "Updating": "Creating"}...`, {autoClose: 1000}) 
    }
    if(isError){
      toast.error(message)
    }
    if((isSuccess && createdColor) || (isSuccess && updatedColor)){
      toast.success( ` Color ${isUpdating ? "Updated": "Created"} Succesfuly!`, {autoClose: 3000, delay: 1000})
    }
  }, [isError, isLoading, isSuccess])

  const sshema = object({
    title: string().required('Title is required'),
    
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorTitle || '',
    },
    validationSchema: sshema,
    onSubmit: (values) => {
      if (isUpdating) {
        const data = {id : colorId, color: values}
        dispatch(updateColor(data))
      } else {
        dispatch(createColor(values))
        formik.resetForm()
      }
      setTimeout(() => {
        if (isSuccess && (createColor || updatedColor)) {
          navigation('/admin/colors')
        }
      }, 2000)
      formik.resetForm()
    }
  })

  return (
    <div className='w-100'>
      <h3 className="mb-4">{isUpdating ? 'Edit' : 'Add'} {label}</h3>
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
              {isLoading ? 'Creating...': `${isUpdating? 'Edit': 'Add'}  ${label}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddColor