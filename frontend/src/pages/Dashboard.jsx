import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.email || "User"} 👋
      </h1>
    </div>
  );
};

export default Dashboard;
