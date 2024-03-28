import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './page/Login';
import ResetPassword from './page/ResetPassword';
import ForgotPassword from './page/ForgotPassword';
import MainLayout from './components/Layout/MainLayout';
import Dashborad from './page/Dashboard';
import Enquaries from './page/Enquaries';
import BlogList from './page/BlogList';
import BlogsCategory from './page/BlogtsCategory';
import OrdersList from './page/OrdersList';
import Custumers from './page/Customers';
import Brands from './page/Brands';
import Colors from './page/Colors';
import ProductCategory from './page/ProductCategory';
import ProductList from './page/ProductList';
import AddBlog from './page/AddBlog';
import AddCatBlogs from './page/AddCatBlog';
import AddBrand from './page/AddBrand';
import AddColor from './page/AddColor';
import AddProducts from './page/AddProducts';
import AddProductCat from './page/AddCatProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashborad />}/>
          <Route path='enquaries' element={<Enquaries />}/>
          <Route path='blogs' element={<BlogList />}/>
          <Route path='blogs/new' element={<AddBlog />}/>
          <Route path='blogs-category' element={<BlogsCategory />}/>
          <Route path='blog-category/new' element={<AddCatBlogs />}/>
          <Route path='orders' element={<OrdersList />}/>
          <Route path='customers' element={<Custumers />}/>
          <Route path='products' element={<ProductList />}/>
          <Route path='products/new' element={<AddProducts />}/>
          <Route path='product-category/new' element={<AddProductCat />}/>
          <Route path='colors' element={<Colors />}/>
          <Route path='colors/new' element={<AddColor />}/>
          <Route path='brands' element={<Brands />}/>
          <Route path='brand/new' element={<AddBrand />}/>
          <Route path='product-category' element={<ProductCategory />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;