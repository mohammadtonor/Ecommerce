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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/index" element={<MainLayout />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
