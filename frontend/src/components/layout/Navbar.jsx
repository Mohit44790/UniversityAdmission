import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());        // clear redux + storage
    navigate("/login");        // redirect to login
  };

  return (
    <nav className="bg-linear-to-r from-[#4C489D] to-[#6A67CE] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left - Logo */}
          <div
            onClick={() => navigate("/dashboard")}
            className="text-white text-xl font-bold tracking-wide cursor-pointer"
          >
            Admission Portal
          </div>

          {/* Center - Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-white/90 hover:text-white font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-white/90 hover:text-white font-medium transition"
            >
              Profile
            </Link>
          </div>

          {/* Right - Logout */}
          <button
            onClick={handleLogout}
            className="bg-white text-[#4C489D] px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
