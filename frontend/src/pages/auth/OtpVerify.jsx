import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyOtp } from '../../redux/slices/authSlice';

const OtpVerify = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { loading } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

   const handleSubmit = async (e) => {
  e.preventDefault();

  const otpValue = otp.join("");
  if (otpValue.length !== 6) {
    toast.error("Please enter 6 digit OTP");
    return;
  }

  const res = await dispatch(verifyOtp({ email, otp: otpValue }));

  if (res.meta.requestStatus === "fulfilled") {
    toast.success("OTP verified successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  } else {
    toast.error(res.payload || "Invalid OTP");
  }
};

  return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC]">
      <div className="relative w-1/3 h-96 bg-linear-to-br from-[#5D54A4] to-[#7C78B8] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden rounded-3xl">

        {/* Background Shapes */}
        <span className="absolute w-1/1 h-96 bg-white/90 -top-18 right-28 rotate-45 rounded-tr-[72px]" />
        <span className="absolute w-1/2 h-56 bg-[#6C63AC] top-20 right-1 rotate-45 rounded-3xl" />
        <span className="absolute w-2/6 h-3/2 bg-linear-to-t from-[#5D54A4] to-[#6A679E] top-16 right-4 rotate-45 rounded-3xl" />
        <span className="absolute w-1/4 h-96 bg-[#7E7BB9] top-62 right-8 rotate-45 rounded-[80px]" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-10">
          <h2 className="text-3xl font-bold text-center mb-4 tracking-wide">
            Verify OTP
          </h2>

          <p className=" text-sm text-center mb-8">
            Enter 6-digit OTP sent to
            <br />
            <span className="font-semibold">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-lg bg-white text-[#4C489D] focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-white text-[#4C489D] font-bold uppercase flex items-center px-6 py-4 rounded-full shadow-lg w-full transition-all duration-300
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-xl"
                }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
              <i className="fas fa-chevron-right ml-auto text-2xl text-[#7875B5]" />
            </button>
          </form>

          <p className="text-violet-950 text-sm font-boldc text-center mt-6 opacity-80">
            Didn’t receive OTP?{" "}
            <span className="underline cursor-pointer hover:text-white">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OtpVerify