import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Select } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { array, object, string } from 'yup';
import { createBlog } from '../features/blogs/BlogsSlice';
import { getBCategories } from '../features/blogCategory/BcategorySlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';


const AddBlog = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const imageState = useSelector(state => state.upload.images);
  const {isLoading, isError, isSuccess, createdBlog, message} = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(getBCategories());
  }, [dispatch]);

  const catBlog = useSelector(state => state.bCategory.BCategories);

  useEffect(() => {
    if(isLoading) {
      toast.warning("Creating Blog...", {autoClose: 1000})
    }
    if(isError) {
      toast.error(message)
    }
  }, [isLoading, isError])

  const schema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    category: string().required('Category is required'),
    images: array().min(1, "").required('Image is required')
  })


  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: imageState
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      setTimeout(() => {
        if(isSuccess && createdBlog) {
          toast.success('Blog added successfully', {autoClose: 3000})
          navigation('/admin/blogs')
        }
      }, 2000)
      formik.resetForm();
    }
  })

  return (
    <div className='w-100'>
      <h3 className="mb-4">Add Blog</h3>
      
      <div className="flex-grow">
      
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
            
          <CustomInput 
            id="title"
            name="title" 
            label={"Enter Blog Title"} 
            type={"text"} 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
              {formik.touched.title && formik.errors.title ? (
                <div className="mb-2">{formik.errors.title}</div>
              ) : null}
            </div>
          <div className='mt-4'/>
          <Select 
            name="category" 
            id="category" 
            className="p-6"
            placeholder="Select Blog Category"
            onChange={formik.handleChange('category')}
            val={formik.values.category}
          >
            {catBlog && catBlog?.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.title}</option>
            ))}
          </Select>
          <div className="error">
              {formik.touched.category && formik.errors.category ? (
                <div className="mb-2">{formik.errors.category}</div>
              ) : null}
            </div>
          <div className='mt-4'/>
          <ReactQuill
            id="description" 
            theme="snow" 
            val={formik.values.description} 
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}

          />
          <div className="error">
              {formik.touched.description && formik.errors.description ? (
                <div className="mb-2">{formik.errors.description}</div>
              ) : null}
          </div>
          <div className='mt-4'/>
          <div className='upload-dropzone'>
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
              >
                {({getRootProps, getInputProps}) => (
                  <div className='' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <InboxOutlined style={{fontSize: 50}} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="error">
              {formik.touched.images && formik.errors.images ? (
                <div className="mb-2">{formik.errors.images}</div>
              ) : null}
            </div>
            <div className="mt-4 d-flex flex-wrap gap-3">
                {Array.isArray(imageState) && imageState?.map((image) => (
                  <div key={image.public_id} className='position-relative'>
                    <button 
                      type='button'
                      className='position-absolute top-0 end-0 btn btn-danger btn-sm ' 
                      onClick={() => dispatch(deleteImage(image.public_id))}>
                        X
                      </button>
                    <img src={image.url} width={200} height={200} style={{objectFit: "contain"}} alt="product" />
                  </div>
                ))}
            </div>
          <button 

          className="add-blog-button">Add Blog</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog