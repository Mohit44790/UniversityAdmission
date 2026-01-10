import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "12px", background: "#222", color: "#fff" }}>
      <Link to="/dashboard" style={{ color: "#fff", marginRight: "16px" }}>
        Dashboard
      </Link>
      <Link to="/profile" style={{ color: "#fff" }}>
        Profile
      </Link>
    </nav>
  );
};

export default Navbar;
