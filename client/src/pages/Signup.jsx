import './signup.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const Signup = () => {
  return (
    <>
        <Meta title='Signup'/>
        <BreadCrump title='Signup'/>
        <Container class1='signup-wrapper home-wrapper-2 py-5'>
            <div className="signup-container">
                <div className="signup-cord">
                    <h3>Create a Account</h3>
                    <form>
                        <CustomInput 
                            type="name" 
                            id="name" 
                            placeholder="Enter your name"  
                        />
                        <CustomInput 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email"
                            />
                        <CustomInput 
                            type="password" 
                                id="password" 
                            placeholder="Enter your password"
                            />    
                        <CustomInput 
                            type="phone"
                            id="phone" 
                            placeholder="Enter yor phone Number"
                            />                        
                        <div className='signup-action'>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Signup