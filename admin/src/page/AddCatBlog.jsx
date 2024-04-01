import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {object, string} from 'yup';
import { useFormik } from 'formik';
import {createBCategory} from './../features/blogCategory/BcategorySlice';
import { toast } from 'react-toastify';


const AddCatBlogs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const {isLoading, isError, isSuccess,message, createdBCattegory} =
   useSelector(state => state.bCategory)

  useEffect(()=> {
    if (isLoading) {
      toast.warning("Creating Category Blog", {autoClose: 1000})
    }
    if (isError){
      toast.error(message)
    }

  }, [isLoading, isError]);

  const shema = object({
    title: string().required("Title is Required")
  })

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: shema,
    onSubmit: (values) => {
      dispatch(createBCategory(values))
      setTimeout(() => {
        if(isSuccess && createBCategory) {
          toast.success("Caegory Blog Created Success!")
          navigation('/admin/blogs-category')
        }
      }, 2000)
      formik.resetForm();
    },
  });


  return (
    <div className='w-100'>
      <h3 className="mb-4">Add Blog Catgory</h3>
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
          <button 
            disabled={isLoading}
            className="add-blog-button"
          >
            {isLoading? "Loading..." : "Add Category Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCatBlogs