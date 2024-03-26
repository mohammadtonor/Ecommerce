import './login.scss'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <div className="py-5 login-wrapper" >
      <div className="login-container">
      <h1>Reset Password</h1>
        <h5>Please Enter your new password and Confirm it</h5>
        <form action="">
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            placeholder="Enter your password"
          />
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmpass"
            placeholder="Enter your password"
          />
          <button type="submit" className="btn-login">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword