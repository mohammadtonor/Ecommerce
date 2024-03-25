import './forgotPassword.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const ForgotPassword = () => {
  return (
    <>
        <Meta title='Forgot Password'/>
        <BreadCrump title='Forgot Password'/>
        <Container class1='forgot-wrapper home-wrapper-2 py-5'>
            <div className="forgot-container">
                <div className="forgot-cord">
                <h3>Forgot Password</h3>
                <p>We will send you email to resete your Password</p>
                <form>
                    <CustomInput type="email" id="email" placeholder="Enter your email" />
                    <div className="forgot-action">
                        <button className=' '>Submit</button>
                        <Link to='/login'>Cancel</Link>
                    </div>
                </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default ForgotPassword