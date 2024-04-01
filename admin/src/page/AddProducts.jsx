import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useFormik } from 'formik';
import { array, number, object, string } from 'yup';
import { getcategories } from '../features/category/categorySlice';
import { getBrands } from '../features/brands/BrandSlice';
import {getColors } from '../features/colors/ColorSlice';
import { addProduct } from '../features/products/ProductSlice';
import Dropzone from 'react-dropzone';
import { deleteImage, uploadImage } from '../features/upload/uploadSlice';

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getcategories());
    dispatch(getBrands());
    dispatch(getColors());
    
  }, []);

  const imagesState = useSelector(state => state.upload.images); 
  

  const categoryState = useSelector(state => state.category.categories);
  const brandState = useSelector(state => state.brand.brands);
  const colorState = useSelector(state => state.color.colors);
  const {isSuccess, isError, isLoading, createsProduct} = useSelector(state => state.product);

  useEffect(() => {
    if (isLoading) {
      message.loading('creating product...')
    }
  })

  const colors = [];
  colorState.map((color) => (
    colors.push({
      value: color._id,
      label:color.title
    })
  ))

  let userSchema = object({
    title: string().required('Title is Required'),
    description: string().required('Description is required'),
    price: number().required('Price is required').min(1, 'Price should be least 1'),
    quantity: number().required('quantity is required').min(1, 'Price should be least 1'),
    category: string().required('Category is required'),
    tag: string().required('Tag is required'),
    brand: string().required('Brand is required'),
    colors: array().min(1,"Color is required").required('Color is required'),
    images: array().min(1,"Image is required").required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: null,
      price: '',
      quantity: '',
      category: '',
      tag: '',
      brand: '',
      colors: '',
      images: imagesState
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      //dispatch(addProduct(values));
      console.log(values);
      if (isSuccess && createsProduct) {
        message.success("Product added successfully!")
        setTimeout(() => {
          navigate('/admin/products')
        }, 3000)
        formik.resetForm();
      } 
      if (isError) {
        message.error("Something went wrong!!!")
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <CustomInput 
            id="title" 
            label={"Enter Product Title"} 
            type={"text"} 
            val={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div className="">{formik.errors.title}</div>
            ) : null}
          </div>
          <div  className='mt-3'/>
          <ReactQuill 
            theme="snow"
            value={formik.values.description}
            onChange={formik.handleChange('description')} 
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div className="mb-2">{formik.errors.description}</div>
            ) : null}
          </div>
          <div  className='mt-3'/>
          <CustomInput
            label={"Enter Product Price"}
            type={"number"}
            name={"price"}
            val={formik.values.price}
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div className="mb-2">{formik.errors.price}</div>
            ) : null}
          </div>
          <div  className='mt-3'/>
          <CustomInput
            label={"Enter Product Quantity"}
            type={"number"}
            name={"quantity"}
            val={formik.values.quantity}
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="mb-2">{formik.errors.quantity}</div>
            ) : null}
          </div>
          <Select
            width="100%"
            name="category"
            className="select-input"
            placeholder="Please Select Category"
            onChange={formik.handleChange('category')}
            options={categoryState.map((category) => ({
              value: category._id,
              label: category.name
            }))}
          />
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div className="mb-2">{formik.errors.category}</div>
            ) : null}
          </div>
          <Select
            width="100%"
            name="tag"
            placeholder="Please Select Tag"
            className="select-input"
            options={[
              {value: "featured",label: "Featured"},
              {value: "speciald",label: "Special"},
              {value: "featured",label: "Featured"},
            ]}
            onChange={formik.handleChange('tag')}
          />
          <div className="error">
            {formik.touched.tag && formik.errors.tag ? (
              <div className="mb-2">{formik.errors.tag}</div>
            ) : null}
          </div>
          <Select
            width="100%"
            name="brand"
            placeholder="Please Select Brand"
            className="select-input"
            options={brandState.map((brand) => ({
              value: brand._id,
              label: brand.title
            }))}
            onChange={formik.handleChange('brand')}
          />
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div className="mb-2">{formik.errors.brand}</div>
            ) : null}
          </div>
          <Select
            mode="multiple"
            className="select-input"
            placeholder="Please select Colors "
            name="colors"
            onChange={(e) => formik.setFieldValue('colors', e)}
            options={colors}
          />
          <div className="error">
            {formik.touched.colors && formik.errors.colors ? (
              <div className="mb-2">{formik.errors.colors}</div>
            ) : null}
          </div>
          <div className="mt-4" />
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
              <div key={formik.errors.images} className="mb-2">{formik.errors.images}</div>
            ) : null}
          </div>
          <div className="mt-4 d-flex flex-wrap gap-3">
            {Array.isArray(imagesState) && imagesState?.map((image, index) => (
              <div key={image.public_id} className='position-relative'>
                <span 
                  key={image.public_id}
                  className='position-absolute top-0 end-0 btn btn-danger btn-sm ' 
                  onClick={() => dispatch(deleteImage(image.public_id))}>
                    X
                  </span>
                <img key={index} src={image?.url} width={200} height={200} style={{objectFit: "contain"}} alt="product" />
              </div>
            ))}
          </div>
          
          <button disabled={isLoading} className="add-blog-button">
            {isLoading ? 'Loading' : 'Add Product'}</button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts