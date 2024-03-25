import './resetPassword.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const ResetPassword = () => {
  return (
    <>
        <Meta title='Reset Password'/>
        <BreadCrump title='Reset Password'/>
        <Container class1='reset-password home-wrapper-2 py-5'>
            <div className="reset-container">
                <div className="reset-card">
                    <h3>Reset Passsword</h3>
                    <form className='reset-form'>
                        <CustomInput type="password" id="password" placeholder="Enter your new password" />
                        <input type="confpassword" id="confirm-password" placeholder="Enter again your  password" />
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default ResetPassword