import './contact.scss';
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump'
import { FaHome } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import {useDispatch, useSelector} from 'react-redux'
import {useFormik} from 'formik';
import { object, string } from 'yup';
import { createContact } from '../features/contact/contactSlice';

const userShema = object({
  name: string().required('Name is required'),
  email: string().email().required('Email is required'),
  mobile: string().required('Mobile is required'),
  comment: string().required('Comment is required'),
}) 

const Contact = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.contact)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: userShema,
    onSubmit: (values) => {
      dispatch(createContact(values))
      formik.resetForm();
    }
  })
  return (
    <>
      <Meta title='Contact Us'/>
      <BreadCrump title='Contact Us'/>
      <Container class1="contact-wrapper home-wrapper-2 py-5">
          <div>
            <iframe 
              title={"map"}
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
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <CustomInput 
                    type="text" 
                    id="name" 
                    placeholder="Enter your name" 
                    onChange={formik.handleChange('name')}
                    onBlur={formik.handleBlur('name')}
                    val={formik.values.name}
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name ? (
                      <div className='mb-2'>{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <CustomInput 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    val={formik.values.email} 
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div className='mb-2'>{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <CustomInput 
                    type="text" 
                    id="subject" 
                    placeholder="Enter your Phone Number..." 
                    onChange={formik.handleChange('mobile')}
                    onBlur={formik.handleBlur('mobile')}
                    val={formik.values.mobile}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className='mb-2'>{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <textarea 
                    id="comment" 
                    placeholder="Enter your message"
                    onChange={formik.handleChange('comment')}
                    onBlur={formik.handleBlur('comment')}
                    val={formik.values.comment}
                  >
                    </textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment ? (
                        <div className='mb-2'>{formik.errors.comment}</div>
                      ) : null}
                    </div>
                </div>

                <button type="submit">{isLoading ? 'loading...' : 'Submit'}</button>
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
      </Container>
    </>
  )
}

export default Contact