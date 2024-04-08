import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Select } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { array, object, string } from 'yup';
import { createBlog, getOneBlog, resetState, updateBlog } from '../features/blogs/BlogsSlice';
import { getBCategories } from '../features/blogCategory/BcategorySlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import { deleteImage, uploadImage,updateImages, resetImages } from '../features/upload/uploadSlice';


const AddBlog = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const location = useLocation();
  const blogId = location.pathname.split('/')[3];
  const isUpdating = blogId !== undefined && blogId !== 'new';
  const catBlog = useSelector(state => state.bCategory.BCategories);
  let img = [];
  const {
    isError,
    isSuccess,
    createdBlog,
    updatedBlog,
    blogData,
    message,
  } = useSelector((state) => state.blog);
  

  const imageState = useSelector(state => state.upload.images);
  useEffect(() => {
    if(isUpdating){
      dispatch(getOneBlog(blogId));
      
    } else {
      dispatch(resetState())
    }
  }, [blogId])


  useEffect(() => {
    dispatch(getBCategories());
  }, []);

  //window.location.reload()


  useEffect(() => {
    if((isSuccess && createdBlog) || (isSuccess && updatedBlog)) {
      toast(`Blog ${isUpdating ? "Updated" : "Created"} SuceesFully`, {autoClose: 1000})
    }
    if(isError) {
      toast.error(message)
    }
  }, [isSuccess, isError, createdBlog, updatedBlog]);

  useEffect(() => {
    dispatch(updateImages(blogData?.images));
  }, [blogData]);

  const schema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    category: string().required('Category is required'),
    images: array().min(1, "").required('Image is required')
  })
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogData?.title || '',
      description: blogData?.description || '',
      category: blogData?.category || '',
      images: imageState || ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
      if(isUpdating ) {
        dispatch(updateBlog({id: blogId, blogData: values}))
        setTimeout(() => {
          navigation('/admin/blogs')
        }, 2000)
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
      }
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
            defaultValue={formik.values.category}
            placeholder="Select Blog Category"
            onChange={formik.handleChange('category')}
            value={formik.values.category}
          >
            {catBlog && catBlog?.map((cat) => (
              <Select.Option   value={cat._id}>{cat.title}</Select.Option>
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
            value={formik.values.description} 
            onChange={formik.handleChange('description')}
          />
          <div className="error">
              {formik.touched.description && formik.errors.description ? (
                <div className="mb-2">{formik.errors.description}</div>
              ) : null}
          </div>
          <div className='mt-4'/>
          <div className='upload-dropzone'>
              <Dropzone
                onChange={formik.handleChange('images')}
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
                      onClick={
                        () => {
                          dispatch(deleteImage(image.public_id))
                        }
                      }>
                        X
                      </button>
                    <img src={image.url} width={200} height={200} style={{objectFit: "contain"}} alt="product" />
                  </div>
                ))}
            </div>
          <button className="add-blog-button">Add Blog</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog