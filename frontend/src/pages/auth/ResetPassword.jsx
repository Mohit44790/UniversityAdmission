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

  const { loading } = useSelector((state) => state.auth);

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
        confirmPassword: formData.confirmPassword,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password reset successful");
      navigate("/login");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <input
          name="otp"
          placeholder="Enter OTP"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
