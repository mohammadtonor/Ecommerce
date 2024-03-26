import './login.scss'
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <div className="py-5 login-wrapper" >
      <div className="login-container">
        <h1>Forgot Password</h1>
        <h5>Please Enter your email to get your forgot password email</h5>
        <form action="">
            <CustomInput
              type="email"
              label="Email"
              id="email"
              placeholder="Enter your email"
            />
          <button type="submit" className="btn-login">
            Send Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword