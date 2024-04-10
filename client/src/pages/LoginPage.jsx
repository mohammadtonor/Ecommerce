import './loginPage.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { loginUser, resetAuth } from '../features/users/userSlice';
import {toast} from 'react-toastify';
import { getTokenfromStorage } from '../utils/configToken';

const userShema = object({
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
})

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
      dispatch(resetAuth())
      if(getTokenfromStorage) {
         navigate('/')
      }
    } ,[]);

  const {user, createdUser, isSuccess, isError} = useSelector(state => state.auth)
  useEffect(() => {
    if (isSuccess && createdUser) {
        toast.success("User Rgistered successfully!");
    }
    if(isError) {
        toast.error("Something went wrong!!!")
    }
  }, [isSuccess, isError, createdUser])

  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: userShema,
    onSubmit: (values) => {
        dispatch(loginUser(values));
        setTimeout(() => {
            navigate('/')
        }, 500)
        formik.resetForm()
    }
  })

  if(getTokenfromStorage) {
    return <Navigate to={'/'}/>
  }

  return (
    <>
        <Meta title='Login'/>
        <BreadCrump title='Login'/>
        <Container class1='login-wrapper home-wrapper-2 py-5'>
            <div className="login-container">
                <div className="login-cord">
                    <h3>Login</h3>
                    <form onSubmit={formik.handleSubmit}>
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
                        <Link className='link' to='/forgot-password'>Forgot your Password?</Link>
                        <div className='login-action'>
                            <button type='submit'>Login</button>
                            <Link to={'/signup'}>Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default LoginPage