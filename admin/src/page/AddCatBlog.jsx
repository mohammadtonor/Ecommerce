import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {object, string} from 'yup';
import { useFormik } from 'formik';
import {createBCategory, getOneBCategory, resetState, updateBCategory} from './../features/blogCategory/BcategorySlice';
import { toast } from 'react-toastify';


const AddCatBlogs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const location  = useLocation();
  const bCatId = location.pathname.split('/')[3];
  const isUpdating = bCatId !== undefined && bCatId !== 'new';
  useEffect(() => {
    if (isUpdating) {
      dispatch(getOneBCategory(bCatId))
    } else {
      dispatch(resetState())
    }
  }, [bCatId])
  
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    createdBCattegory,
    BCategoryTitle,
    updatedBCategory,
  } = useSelector((state) => state.bCategory);

  useEffect(() => {
    if ((isSuccess && createdBCattegory) || (isSuccess && updatedBCategory)) {
      toast.success("Caegory Blog Created Success!", {autoClose: 2500});
    }
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess,isError, updatedBCategory, createdBCattegory ]);

  const shema = object({
    title: string().required("Title is Required")
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BCategoryTitle || "",
    },
    validationSchema: shema,
    onSubmit: (values) => {
      if (isUpdating) {
        const data = { id: bCatId, bCategory: values}
        dispatch(updateBCategory(data));
        setTimeout(() => {
          navigation('/admin/blogs-category')
        }, 1000);
      } else {
        dispatch(createBCategory(values))
      }
      if(isError) {
        toast.success(message)
      }
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