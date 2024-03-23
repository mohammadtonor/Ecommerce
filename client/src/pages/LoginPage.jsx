import './loginPage.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
        <Meta title='Login'/>
        <BreadCrump title='Login'/>
        <div className='login-wrapper home-wrapper-2 py-5'>
            <div className="container-xxl">
                <div className="login-container">
                    <div className="login-cord">
                        <h3>Login</h3>
                        <form>
                            <div className="form-group">
                                <input type="email" id="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" placeholder="Enter your password" />
                            </div>
                            <Link className='link' to='/forgot-password'>Forgot your Password?</Link>
                            
                            <div className='login-action'>
                            <button>Login</button>
                            <button>Signup</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage