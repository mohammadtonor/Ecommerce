import './loginPage.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const LoginPage = () => {
  return (
    <>
        <Meta title='Login'/>
        <BreadCrump title='Login'/>
        <Container class1='login-wrapper home-wrapper-2 py-5'>
            <div className="login-container">
                <div className="login-cord">
                    <h3>Login</h3>
                    <form>
                        <CustomInput type="email" id="email" placeholder="Enter your email" />
                        <CustomInput type="password" id="password" placeholder="Enter your password" />
                        <Link className='link' to='/forgot-password'>Forgot your Password?</Link>
                        <div className='login-action'>
                            <button>Login</button>
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