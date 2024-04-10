import './forgotPassword.scss'
import Meta from '../components/Meta'
import BreadCrump from '../components/BreadCrump';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { forgotPassword } from '../features/users/userSlice';

const userShema = object({
    email: string().email().required('Email is required'),
});

const ForgotPassword = () => {
  const {isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
        email: '',
    },
    validationSchema: userShema,
    onSubmit: (values) => {
        dispatch(forgotPassword(values))
        formik.resetForm()
    }
  })
  return (
    <>
      <Meta title="Forgot Password" />
      <BreadCrump title="Forgot Password" />
      <Container class1="forgot-wrapper home-wrapper-2 py-5">
        <div className="forgot-container">
          <div className="forgot-cord">
            <h3>Forgot Password</h3>
            <p>We will send you email to resete your Password</p>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                val={formik.values.email}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email ? (
                  <div className="mb-2">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="forgot-action">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending Email..." : "Submit"}
                </button>
                <Link to="/login">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ForgotPassword