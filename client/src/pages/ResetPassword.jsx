import './resetPassword.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta';

const ResetPassword = () => {
  return (
    <>
        <Meta title='Reset Password'/>
        <BreadCrump title='Reset Password'/>
        <div className='reset-password home-wrapper-2 py-5'>
            <div className="container-xxl">
                <div className="reset-container">
                    <div className="reset-card">
                        <h3>Reset Passsword</h3>
                        <form className='reset-form'>
                            <input type="password" id="password" placeholder="Enter your new password" />
                            <input type="confpassword" id="confirm-password" placeholder="Enter again your  password" />
                            <button type="submit">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResetPassword