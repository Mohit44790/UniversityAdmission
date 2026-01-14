import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading ,error} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })


  const handleChange = (e) =>{
  setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));

    navigate('/dashboard');
  }
  return (
    <div className=' flex items-center justify-center bg-linear-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC] '>
      <div className='relative z-10 h-full flex flex-col justify-center px-10'>
        <h2 className='text-3xl font-bold text-center mb-8 tracking-wide'>Admission Portal</h2>
        <form onSubmit={handleSubmit} className='space-y-7'>
          <div className="relative group">
              <i className="fas fa-user absolute top-3 left-1  transition" />
              <input
                type="email"
                name="email"
                placeholder="User name / Email"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-white/40 pl-8 py-2 font-semibold   focus:outline-none focus:border-white transition"
                required
              />
            </div>

        </form>
      </div>
    </div>
  )
}

export default Login