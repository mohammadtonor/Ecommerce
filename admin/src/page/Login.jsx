import {useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput'
import './login.scss'
import {Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { login } from './../features/auth/authSlice'
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isSuccess} = useSelector((state) =>state.auth)
  useEffect(()=> {
    if(isSuccess) {
      navigate('/admin')
    } 
  })

  let userSchema = object({
    email: string().email('Invalid email address')
      .required('Required'),
    password: string().required('Password required')
    .min(6, 'Pasword must be at least 6 characters')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log("gfsgfs");
      dispatch(login(values))
    },
  });
  return (
    <div className="py-5 login-wrapper" >
      <div className="login-container">
        <h1>Login</h1>
        <h5>Login your account to contimue</h5>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            label="Email"
            id="email"
            name='email'
            placeholder="Enter your email"
            onChange={formik.handleChange('email')}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div className='mb-2'>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="password"
            name='password'
            placeholder="Enter your password"
            onChange={formik.handleChange('password')}
            val={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className='forgot-link'>
            <Link to='/admin/forgot-password'>forgot your password?</Link>
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login
