import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(forgotPassword(email));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent to your email");
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-5">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
