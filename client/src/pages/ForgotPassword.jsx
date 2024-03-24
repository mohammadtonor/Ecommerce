import './forgotPassword.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
        <Meta title='Forgot Password'/>
        <BreadCrump title='Forgot Password'/>
        <div className='forgot-wrapper home-wrapper-2 py-5'>
            <div className="container-xxl">
            <div className="forgot-container">
                <div className="forgot-cord">
                <h3>Forgot Password</h3>
                <p>We will send you email to resete your Password</p>
                <form>
                    <div className="form-group">
                    <input type="email" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="forgot-action">
                        <button className=' '>Submit</button>
                        <Link to='/login'>Cancel</Link>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword