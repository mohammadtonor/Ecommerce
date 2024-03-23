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
            <Route path='compare-product' element={<CompareProducts />} />
            <Route path='whishlist' element={<WhishlistProduct />} />
            <Route path='login' element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
