import './contact.scss';
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump'
import { FaHome } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <>
      <Meta title='Contact Us'/>
      <BreadCrump title='Contact Us'/>
      <div className="contact-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15413.506108086172!2d51.16116314477239!3d35.69446809040172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8df07277f96f0b%3A0x50e1f3647d414beb!2sDigikala%20Processing%20Center!5e0!3m2!1sen!2s!4v1711131869808!5m2!1sen!2s"
              height="450" 
              style={{border:0, width: '100%'}} 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
          <div className="contact-card">
            <div className='contact-form'>
              <h3>Contact</h3>
              <form>
                <div className="form-group">
                  <input type="text" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <input type="text" id="subject" placeholder="Enter your Phone Number..." />
                </div>
                <div className="form-group">
                  <textarea id="message" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit">Send</button>
              </form>
            </div>
            <div className="contact-info">
              <h3>Address Info</h3>
              <div className="contact-info-item">
                <FaHome/>
                <address>123 Main Street, Anytown, USA</address>
              </div>
              <div className="contact-info-item">
                <IoMdCall />
                <a href='tel:+98 917 362 3364'>+98 (917) 362-3364</a>
              </div>
              <div className="contact-info-item">
                <MdEmail />
                <a href='mailto:mtonor1368@gmail.com'>mtonor1368@gmail.com</a>
              </div>
              <div className="contact-info-item">
                <IoInformationCircleOutline  />
                <p>Information</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Contact