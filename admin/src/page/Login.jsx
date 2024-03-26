import CustomInput from '../components/CustomInput'
import './login.scss'
import {Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="py-5 login-wrapper" >
      <div className="login-container">
        <h1>Login</h1>
        <h5>Login your account to contimue</h5>
        <form action="">
          <CustomInput
            type="email"
            label="Email"
            id="email"
            placeholder="Enter your email"
          />
          <CustomInput
            type="password"
            label="Password"
            id="password"
            placeholder="Enter your password"
          />
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
