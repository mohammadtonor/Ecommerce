import './signup.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import {useDispatch, useSelector } from 'react-redux';
import {useFormik} from 'formik';
import {object, string,} from 'yup';
import { useEffect } from 'react';
import { regiterUser } from '../features/users/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const userShema = object({
    firstName: string().required('firstName is required'),
    lastName: string().required('LastName is required'),
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
    mobile: string().required('Mobile is required'),
})

const Signup = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const {user, isSuccess, isError} = useSelector(state => state.auth)

  useEffect(() => {
    if (isSuccess && user) {
        toast.success("User Rgistered successfully!")
    }
    if(isError) {
        toast.error("Something went wrong!!!")
    }
  }, [isSuccess, isError, user])
  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: ''
    },
    validationSchema: userShema,
    onSubmit: (values) => {
        dispatch(regiterUser(values))
        setTimeout(() => {
            navigation('/login')
        }, 1000)
    }
  })
  return (
    <>
        <Meta title='Signup'/>
        <BreadCrump title='Signup' />
        <Container class1='signup-wrapper home-wrapper-2 py-5'>
            <div className="signup-container">
                <div className="signup-cord">
                    <h3>Create a Account</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <CustomInput 
                            type="text" 
                            id="firstName"  
                            placeholder="Enter your first name"  
                            onChange={formik.handleChange('firstName')}
                            onBlur={formik.handleBlur('firstName')}
                            val={formik.values.firstName}
                        />
                        <div className="error">
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className='mb-2'>{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            type="text" 
                            id="lastName" 
                            placeholder="Enter your lastName"  
                            onChange={formik.handleChange('lastName')}
                            onBlur={formik.handleBlur('lastName')}
                            val={formik.values.name}
                        />
                        <div className="error">
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className='mb-2'>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            val={formik.values.email}
                        />
                        <div className="error">
                            {formik.touched.email && formik.errors.email ? (
                                <div className='mb-2'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            type="password" 
                            id="password" 
                            name="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            val={formik.values.password}
                        />    
                        <div className="error">
                            {formik.touched.password && formik.errors.password ? (
                                <div className='mb-2'>{formik.errors.password}</div>
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
                        />  
                        <div className="error">
                            {formik.touched.mobile && formik.errors.mobile ? (
                                <div className='mb-2'>{formik.errors.mobile}</div>
                            ) : null}
                        </div>                      
                        <div className='signup-action'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Signup