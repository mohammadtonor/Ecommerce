import { Navigate, Outlet } from 'react-router-dom';

const getTokenfromStorage = localStorage.getItem('customer') 
    ? JSON.parse(localStorage.getItem('customer'))?.token
    : null;
export const ProtectedRoute = ({children}) => {
  console.log(getTokenfromStorage !== null);
  return getTokenfromStorage !== null ? children : <Navigate to='/login'/>
}

