import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resendOtp, verifyOtp } from "../../redux/slices/authSlice";

const OtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { loading } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  /* ---------------- OTP INPUT HANDLERS ---------------- */

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

  /* ---------------- VERIFY OTP ---------------- */

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
      setTimeout(() => navigate("/login"), 1200);
    } else {
      toast.error(res.payload || "Invalid OTP");
    }
  };

  /* ---------------- RESEND OTP ---------------- */

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    const res = await dispatch(resendOtp({ email }));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP resent successfully");
      setTimer(30);
    } else {
      toast.error(res.payload);
    }
  };

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC] px-4">
      <div
        className="
          relative
          w-full
          max-w-sm
          sm:max-w-md
          md:max-w-lg
          bg-linear-to-br
          from-[#5D54A4]
          to-[#7C78B8]
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          rounded-3xl
          overflow-hidden
          py-10
        "
      >
        {/* Decorative Shapes (hidden on mobile) */}
        <span className="absolute w-64 h-72 bg-white/80 -top-20 -right-20 rotate-45 rounded-3xl hidden sm:block" />
        <span className="absolute w-48 h-48 bg-[#6C63AC] top-28 -right-12 rotate-45 rounded-3xl hidden sm:block" />
        <span className="absolute w-36 h-36 bg-linear-to-t from-[#5D54A4] to-[#6A679E] top-44 right-8 rotate-45 rounded-3xl hidden md:block" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            Verify OTP
          </h2>

          <p className="text-sm text-center mb-6">
            Enter 6-digit OTP sent to
            <br />
            <span className="font-semibold break-all">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="
                    w-10 h-12
                    sm:w-12 sm:h-14
                    text-center
                    text-lg sm:text-xl
                    font-bold
                    rounded-lg
                    bg-white
                    text-[#4C489D]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-400
                  "
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-white text-[#4C489D] font-bold uppercase flex items-center
                px-5 py-3 sm:px-6 sm:py-4
                rounded-full shadow-lg w-full transition-all duration-300
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-xl"
                }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
              <span className="ml-auto text-xl">→</span>
            </button>
          </form>

          {/* Resend OTP */}
          <p className="text-sm text-center mt-6">
            Didn’t receive OTP?{" "}
            {timer > 0 ? (
              <span className="opacity-60">Resend in {timer}s</span>
            ) : (
              <span
                onClick={handleResendOtp}
                className="underline cursor-pointer hover:text-white"
              >
                Resend
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
