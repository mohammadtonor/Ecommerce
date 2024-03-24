import './signup.scss'
import BreadCrump from '../components/BreadCrump';
import Meta from '../components/Meta'

const Signup = () => {
  return (
    <>
        <Meta title='Signup'/>
        <BreadCrump title='Signup'/>
        <div className='signup-wrapper home-wrapper-2 py-5'>
            <div className="container-xxl">
                <div className="signup-container">
                    <div className="signup-cord">
                        <h3>Create a Account</h3>
                        <form>
                            <div className="form-group">
                                <input type="name" id="name" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <input type="email" id="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" placeholder="Enter your password" />
                            </div>    
                            <div className="form-group">
                                <input type="phone" id="phone" placeholder="Enter yor phone Number" />
                            </div>                        
                            <div className='signup-action'>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup