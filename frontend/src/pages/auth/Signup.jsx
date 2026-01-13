import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    confirmPassword:""
  });

  const handleChange  =(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await dispatch(registerUser(formData));
    if(res.success){
      navigate("/login");
    }
  }
  return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="relative w-[500px] h-[580px] bg-linear-to-br from-[#5D54A4] to-[#7C78B8] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden rounded-3xl">

        {/* Background Shapes */}
        <span className="absolute w-[520px] h-[520px] bg-white/90 top-[-60px] right-[120px] rotate-45 rounded-tr-[72px]" />
        <span className="absolute w-[220px] h-[220px] bg-[#6C63AC] top-[-180px] right-[-40px] rotate-45 rounded-3xl" />
        <span className="absolute w-[200px] h-[560px] bg-linear-to-t from-[#5D54A4] to-[#6A679E] top-[-20px] right-[-20px] rotate-45 rounded-3xl" />
        <span className="absolute w-[220px] h-[420px] bg-[#7E7BB9] top-[460px] right-[40px] rotate-45 rounded-[80px]" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-10">
          <h2 className=" text-3xl font-bold text-center mb-6 tracking-wide">
            Admission Portal
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div className="relative group">
              <i className="fas fa-user absolute top-3 left-1  transition" />
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-300 pl-8 py-2 font-semibold  focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <i className="fas fa-envelope absolute top-3 left-1  transition" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-300 pl-8 py-2 font-semibold  focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {/* Mobile */}
            <div className="relative group">
              <i className="fas fa-phone absolute top-3 left-1  transition" />
              <input
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-300 pl-8 py-2 font-semibold  focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <i className="fas fa-lock absolute top-3 left-1  transition" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-300 pl-8 py-2 font-semibold  focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <i className="fas fa-lock absolute top-3 left-1  transition" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-300 pl-8 py-2 font-semibold  focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center animate-pulse">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-white cursor-pointer text-[#4C489D] font-bold uppercase flex items-center justify-center px-6 py-4 rounded-full shadow-lg w-full transition-all duration-300
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-xl"}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer text */}
          <p className="text-white text-xs text-center mt-6 opacity-80">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer hover:text-white"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup