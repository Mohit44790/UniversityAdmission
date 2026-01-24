
import { useDispatch } from 'react-redux';
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateToken } from './redux/slices/authSlice';
import { useEffect } from 'react';

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);
  

  return (
    <>
      <ToastContainer />
     <AppRoutes />
    </>
  )
}

export default App
