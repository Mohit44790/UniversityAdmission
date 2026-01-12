import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading ,error] =useSelector((state)=>state.auth);

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
    <div>

      <form >
         <input name="name" placeholder='Full Name'/> 
         <input name="email" placeholder ="Email"/>
         <input name="mobile" placeholder = "Mobile Number"/>
         <input name="password" placeholder="Password" />
         <input name="confirmPassword" placeholder="Confirm Password"/>

         <button type='submit' disabled={loading} className={`bg-white cursor-pointer text-violet-500 font-bold uppercase flex items-center justify-center px-6 py-4 rounded-full shadow-lg w-full transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-xl"}`} >Register</button>
         {/* Footer text */}
          <p className=" text-xs text-center mt-6 opacity-80">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer"
            >
              Login
            </span>
          </p>
      </form>
    </div>
  )
}

export default Signup