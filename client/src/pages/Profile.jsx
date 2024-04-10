import './profile.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { getOneCustomer, updateUser } from '../features/users/userSlice';
import { FaRegEdit } from "react-icons/fa";

const userShema = object({
    email: string().email().required('Email is required'),
    firstName: string().required('firstName is required'),
    lastName: string().required('LastName is required'),
})

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false)
  const {customerProfile, isSuccess, isError} = useSelector(state => state.auth)
  useEffect(() => {
      dispatch(getOneCustomer())
  },[]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        email: customerProfile?.email || '',
        firstName: customerProfile?.firstName || '',
        lastName: customerProfile?.lastName || '',
        mobile: customerProfile?.mobile || ""
    },
    validationSchema: userShema,
    onSubmit: (values) => {
        dispatch(updateUser(values));
        setTimeout(() => {
            getOneCustomer()
            setEdit(false)
        }, 100)
    }
  })

  return (
    <>
        <Meta title='Profile'/>
        <BreadCrump title='Login'/>
        <Container class1='profile-wrapper home-wrapper-2 py-5'>
            <div className="profile-container">
                <div className="profile-cord">
                    <div>
                        <h3>Profile</h3>
                        <button className='btn'>
                            <FaRegEdit size={20} onClick={() => setEdit(!edit)}/>
                        </button>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <CustomInput 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            val={formik.values.email}
                            isDisabled={!edit}
                        />
                        <div className="error">
                            {formik.touched.email && formik.errors.email ? (
                                <div className='mb-2'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            type="firstName" 
                            id="firstName" 
                            name="firstName"
                            placeholder="Enter your firstName"
                            onChange={formik.handleChange('firstName')}
                            onBlur={formik.handleBlur('firstName')}
                            val={formik.values.firstName}
                            isDisabled={!edit}
                        />    
                        <div className="error">
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className='mb-2'>{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            type="text" 
                            id="lastName" 
                            name='lastName' 
                            placeholder="Enter your lastName"  
                            onChange={formik.handleChange('lastName')}
                            onBlur={formik.handleBlur('lastName')}
                            val={formik.values.lastName}
                            isDisabled={!edit}
                        />
                        <div className="error">
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className='mb-2'>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            type="text"
                            id="mobile"
                            name="mobile" 
                            placeholder="Enter yor phone Number"
                            onChange={formik.handleChange('mobile')}
                            onBlur={formik.handleBlur('mobile')}
                            val={formik.values.mobile}
                            isDisabled={!edit}
                        />  
                        <div className="error">
                            {formik.touched.mobile && formik.errors.mobile ? (
                                <div className='mb-2'>{formik.errors.mobile}</div>
                            ) : null}
                        </div> 
                        {edit && (
                            <div className='profile-action'>
                                <button type='submit'>Update</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Profile