import './App.css';
import './Style.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blogs from './pages/Blogs';
import CompareProducts from './pages/CompareProducts';
import WhishlistProduct from './pages/WhishlistProduct';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivatePolicy from './pages/poicies/PrivatePolicy';
import RefundPolicy from './pages/poicies/REfundPolicy';
import TermPolicy from './pages/poicies/TermPolicy';
import ShipingPolicy from './pages/poicies/ShippingPolicy';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='store' element={<OurStore />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='blogs/:id' element={<SingleBlog /> } />
            <Route path='products/:id' element={<SingleProduct /> } />
            <Route path='compare-product' element={<CompareProducts />} />
            <Route path='whishlist' element={<WhishlistProduct />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<Signup />} />
            <Route path='forgot-password' element={<ForgotPassword /> } />
            <Route path='reset-password' element={<ResetPassword /> } />
            <Route path='private-policy' element={<PrivatePolicy /> } />
            <Route path='refund-policy' element={<RefundPolicy /> } />
            <Route path='term-policy' element={<TermPolicy /> } />
            <Route path='shiping-policy' element={<ShipingPolicy /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
