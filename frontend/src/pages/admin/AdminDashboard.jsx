import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/admin/students", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(res.data);
  } catch (err) {
    toast.error("Failed to fetch students");
  }
};


  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (userId, status, remarks) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/application/${userId}`,
        { status, remarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Application ${status}`);
      fetchApplications();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchStudents();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ================= REGISTERED STUDENTS ================= */}

<h2 className="text-2xl font-semibold mt-10 mb-4 text-indigo-700">
  Registered Students
</h2>

<div className="bg-white shadow rounded-lg overflow-hidden">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {students.map((stu) => (
        <tr key={stu.id}>
          <td className="px-6 py-4">{stu.fullName}</td>
          <td className="px-6 py-4">{stu.email}</td>
          <td className="px-6 py-4">{stu.mobile}</td>
          <td className="px-6 py-4">
            {stu.emailVerified ? (
              <span className="text-green-600 font-semibold">Verified</span>
            ) : (
              <span className="text-red-600 font-semibold">Not Verified</span>
            )}
          </td>
        </tr>
      ))}

      {students.length === 0 && (
        <tr>
          <td colSpan="4" className="text-center p-4">
            No students registered yet.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.userId}>
                <td className="px-6 py-4 whitespace-nowrap">{app.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.selectedProgramLevel}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.applicationStatus === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      app.applicationStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {app.applicationStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {app.applicationStatus === 'PENDING' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateStatus(app.userId, 'APPROVED', 'Documents Verified')}
                        className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded">
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app.userId, 'REJECTED', 'Missing Documents')}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                        Reject
                      </button>
                    </div>
                  )}
                  {app.applicationStatus !== 'PENDING' && (
                    <span className="text-gray-500 italic">No actions available</span>
                  )}
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">No pending applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;