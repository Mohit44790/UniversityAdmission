import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(forgotPassword(email));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent to your email");
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error(res.payload || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C7C5F4] via-[#9F9BD8] to-[#776BCC] px-4">
      <div className="relative w-full max-w-md sm:max-w-lg bg-gradient-to-br from-[#5D54A4] to-[#7C78B8] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden rounded-3xl py-12">

        {/* Background Shapes (same style as Login) */}
        <span className="absolute w-96 h-96 bg-white/90 -top-20 right-24 rotate-45 rounded-tr-[72px] hidden sm:block" />
        <span className="absolute w-52 h-44 bg-[#6C63AC] -top-32 -right-10 rotate-45 rounded-3xl hidden sm:block" />
        <span className="absolute w-52 h-[420px] bg-gradient-to-t from-[#5D54A4] to-[#6A679E] top-0 -right-10 rotate-45 rounded-3xl hidden md:block" />
        <span className="absolute w-26 h-[290px] bg-[#7E7BB9] bottom-[-120px] right-10 rotate-45 rounded-[80px] hidden md:block" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10">
          <h2 className="text-3xl font-bold text-center mb-8 tracking-wide ">
            Forgot Password
          </h2>

          <p className="text-sm text-center /80 mb-6">
            Enter your registered email to receive OTP
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email */}
            <div className="relative group">
              <i className="fas fa-envelope absolute top-3 left-1 /70" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/40 pl-8 py-2 font-semibold  focus:outline-none focus:border-white transition"
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
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-xl"
                }`}
            >
              {loading ? "Sending..." : "Send OTP"}
              <i className="fas fa-chevron-right ml-auto text-2xl text-[#7875B5]" />
            </button>
          </form>

          {/* Footer */}
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

export default ForgotPassword;
