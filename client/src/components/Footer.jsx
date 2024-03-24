import { SlEnvolopeLetter } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FaMobileAlt, FaTelegram, FaLinkedin , FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className='py-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-5'>
              <div className="d-flex align-items-center ">
                <SlEnvolopeLetter className="text-white" size={30} />
                <p className='mb-0 ms-3 text-white'>
                  Sign-up for our newsletter
                </p>
              </div>
              
            </div>
            <div className="col-7">
                <div className="d-flex p-1 bg-white">
                  <input
                    type="email"
                    className="form-control form-input-footer"
                    placeholder="Enter your email"
                  />
                  <span className="btn footer-first-button">Subscribe</span>
                </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-3'>
        <div className="container footer__contaner">
          <div className="footer__grid">
            <div className="footer__grid__item">
              <h4>Contact</h4>
              <div>
                <address>
                  Iran, Hormozgan, Jenah <br/>
                  Adineh Str, Hafez Str, 6th Noor ave 
                </address>
                <a className="footer_grid_item-link" href="tel:+98 9173623364">
                  <FaMobileAlt size={20}/>
                  +98 917 362 3364
                </a>
                <a className="footer_grid_item-link" href="tel:+98 9173623364">
                  <MdOutlineAttachEmail size={20}/>
                  mtonor1368@gmail.com
                </a>
                <div >
                    <a href="https://www.facebook.com">
                      <FaGithub size={20} />
                    </a>
                    <a href="https://www.twitter.com">
                      <FaLinkedin  size={20} />
                    </a>
                    <a href="https://t.m/+989173623364">
                      <FaTelegram size={20} />
                    </a>
                    <a href="https://www.instagram.com">
                      <FaInstagram size={20} />
                    </a>
                    <a href="https://www.instagram.com">
                      <FaWhatsapp size={20} />
                    </a>
                </div> 
              </div>
            </div>
            <div className="footer__grid__item">
                <h4>Information</h4>
                <div>
                    <Link to='/private-policy'>Private Policy</Link>
                    <Link to='/refund-policy'>Refound Policy</Link>
                    <Link to='/shiping-policy'>Shipping Policy</Link>
                    <Link to='/term-policy'>Terms & Condition</Link>
                    <Link to='/blogs'>Blogs</Link>
                </div>
              </div>
            <div className="footer__grid__item">
                <h4>Account</h4>
                  <div>
                      <Link to='/'>About</Link>
                        <Link to='/'>Press</Link>
                        <Link to='/'>Blog</Link>
                    <Link>FAQ</Link>
                    </div>
              </div>
            <div className="footer__grid__item">
                <h4>Links</h4>
                  <div>
                      <Link to='/'>About</Link>
                        <Link to='/'>Press</Link>
                        <Link to='/'>Blog</Link>
                       <Link to='/'>FAQ</Link>
                    </div>
              </div>
          </div>
        </div>
      </footer>
      <footer className='py-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <p className='mb-0 text-white'>&copy; 2021 Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer