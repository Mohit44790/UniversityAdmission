
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateToken } from './redux/slices/authSlice';
import { useEffect } from 'react';

function App() {
   const dispatch = useDispatch();
   const { token, hasLoggedIn } = useSelector((state) => state.auth);

useEffect(() => {
  // ✅ validate ONLY on refresh, not immediately after login
  if (token && !hasLoggedIn) {
    dispatch(validateToken());
  }
}, [token, hasLoggedIn, dispatch]);
  

  return (
    <>
      <ToastContainer />
     <AppRoutes />
    </>
  )
}

export default App
