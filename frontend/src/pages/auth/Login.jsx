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

  if (res.meta.requestStatus === "fulfilled") {
    toast.success("Login successful");
    navigate("/dashboard");
  } else {
    toast.error(res.payload || "Login failed");
  }
};

  return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="relative w-125 h-[580px] bg-linear-to-br from-[#5D54A4] to-[#7C78B8] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden rounded-3xl">

        {/* Background Shapes */}
        <span className="absolute w-120 h-[520px] bg-white/90 top-[-60px] right-[120px] rotate-45 rounded-tr-[72px]" />
        <span className="absolute w-52 h-[220px] bg-[#6C63AC] top-[-180px] right-[-40px] rotate-45 rounded-3xl" />
        <span className="absolute w-52 h-[560px] bg-gradient-to-t from-[#5D54A4] to-[#6A679E] top-[-20px] right-[-20px] rotate-45 rounded-3xl" />
        <span className="absolute w-56 h-[420px] bg-[#7E7BB9] top-[420px] right-[40px] rotate-45 rounded-[80px]" />

         {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-10">
          <h2 className="  text-3xl font-bold text-center mb-8 tracking-wide">
            Admission
          </h2>
        <form onSubmit={handleSubmit} className='space-y-7'>
          {/* Email */}
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
            {/* Password */}
            <div className="relative group">
              <i className="fas fa-lock absolute top-3 left-1  transition" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-white/40 pl-8 py-2 font-semibold focus:outline-none focus:border-white transition"
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
              className={`bg-white text-[#4C489D] font-bold uppercase flex items-center px-6 py-4 rounded-full shadow-lg w-full transition-all duration-300
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-xl"}`}
            >
              {loading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                "Log In Now"
              )}
              <i className="fas fa-chevron-right ml-auto text-2xl text-[#7875B5]" />
            </button>


        </form>
        <p className="text-center text-sm text-purple-400 font-bold mt-6">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/")}
    className="font-semibold text-white cursor-pointer hover:underline"
  >
    Register here
  </span>
</p>
 {/* Social Login */}
          <div className="absolute bottom-6 right-6 text-white text-center">
            <h3 className="text-xs mb-2 uppercase tracking-widest opacity-80">
              log in via
            </h3>
            <div className="flex gap-5 justify-center">
              <i className="fab fa-instagram cursor-pointer hover:scale-125 hover:text-pink-300 transition" />
              <i className="fab fa-facebook cursor-pointer hover:scale-125 hover:text-blue-300 transition" />
              <i className="fab fa-twitter cursor-pointer hover:scale-125 hover:text-sky-300 transition" />
            </div>
            </div>
      </div>
      </div>
    </div>
  )
}

export default Login