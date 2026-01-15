import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await dispatch(
      resetPassword({
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData
        .confirmPassword,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password reset successful");
      navigate("/login");
    } else {
      toast.error(res.payload || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC] px-4">
      <div className="relative w-full max-w-md sm:max-w-lg h-auto bg-gradient-to-br from-[#5D54A4] to-[#7C78B8] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden rounded-3xl py-12">

        {/* Background Shapes (same as Login) */}
        <span className="absolute w-96 h-96 bg-white/90 -top-20 right-24 rotate-45 rounded-tr-[72px] hidden sm:block" />
        <span className="absolute w-52 h-52 bg-[#6C63AC] -top-32 -right-10 rotate-45 rounded-3xl hidden sm:block" />
        <span className="absolute w-52 h-[520px] bg-gradient-to-t from-[#5D54A4] to-[#6A679E] top-0 -right-10 rotate-45 rounded-3xl hidden md:block" />
        <span className="absolute w-56 h-[380px] bg-[#7E7BB9] bottom-[-120px] right-10 rotate-45 rounded-[80px] hidden md:block" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10">
          <h2 className="text-3xl font-bold text-center mb-8 tracking-wide ">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* OTP */}
            <div className="relative group">
              <i className="fas fa-key absolute top-3 left-1 " />
              <input
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-white/40 pl-8 py-2 font-semibold   focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {/* New Password */}
            <div className="relative group">
              <i className="fas fa-lock absolute top-3 left-1 " />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-white/20 pl-8 py-2 font-semibold   focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <i className="fas fa-lock absolute top-3 left-1 " />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-white/40 pl-8 py-2 font-semibold   focus:outline-none focus:border-white transition"
                required
              />
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center animate-pulse">
                {error}
              </p>
            )}

            {/* Submit Button */}
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
              {loading ? "Resetting..." : "Reset Password"}
              <i className="fas fa-chevron-right ml-auto text-2xl text-[#7875B5]" />
            </button>
          </form>

          {/* Footer Links */}
          <p
            onClick={() => navigate("/login")}
            className="text-center text-sm  mt-6 cursor-pointer hover:underline"
          >
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
