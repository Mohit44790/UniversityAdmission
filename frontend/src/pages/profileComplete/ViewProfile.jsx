import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { profile: data, loading, error } = useSelector((s) => s.profile);


  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (!data) return <div className="p-6 text-center">No profile found</div>;

  const getFileUrl = (path) => {
  if (!path) return "";

  const fileName = path.split("uploads\\")[1]; // mk688905_gmail_com\photo.jpg
  return `http://localhost:8080/uploads/${fileName.replaceAll("\\", "/")}`;
};

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-6">Student Profile</h2>

      {/* PHOTO + SIGNATURE */}
      <div className="flex gap-10 mb-8">
        <div>
          <p className="text-sm text-gray-500">Photo</p>
          <img
  src={getFileUrl(data.photoPath)}
  alt="photo"
  className="w-32 h-32 object-cover border"
/>
        </div>

        <div>
          <p className="text-sm text-gray-500">Signature</p>
         
<img
  src={getFileUrl(data.signaturePath)}
  alt="sign"
  className="w-32 h-20 object-cover border"
/>
        </div>
      </div>

      {/* APPLICATION STATUS */}
      <div className="mb-6 p-4 bg-green-50 border rounded">
        <p className="font-semibold">
          Application Status: {data.applicationStatus}
        </p>
        <p className="text-sm text-gray-600">
          Admin Remarks: {data.adminRemarks}
        </p>
      </div>

      {/* BASIC DETAILS */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <ProfileItem label="Full Name" value={data.fullName} />
        <ProfileItem label="Email" value={data.userId} />
        <ProfileItem label="Gender" value={data.gender} />
        <ProfileItem label="Category" value={data.category} />
        <ProfileItem label="Date of Birth" value={data.dateOfBirth} />
        <ProfileItem label="Nationality" value={data.nationality} />
        <ProfileItem label="Religion" value={data.religion} />
        <ProfileItem label="Family Income" value={data.familyIncome} />
      </div>

      {/* CONTACT */}
      <Section title="Contact Information">
        <ProfileItem label="Alternate Email" value={data.alternateEmail} />
        <ProfileItem label="Alternate Mobile" value={data.alternateMobile} />
        <ProfileItem label="Emergency Contact" value={data.emergencyContact} />
      </Section>

      {/* ADDRESS */}
      <Section title="Address">
        <ProfileItem label="Permanent Address" value={data.permanentAddress} />
        <ProfileItem label="Correspondence Address" value={data.correspondenceAddress} />
      </Section>

      {/* FAMILY */}
      <Section title="Family Details">
        <ProfileItem label="Father Name" value={data.fatherName} />
        <ProfileItem label="Father Mobile" value={data.fatherMobile} />
        <ProfileItem label="Mother Name" value={data.motherName} />
        <ProfileItem label="Mother Mobile" value={data.motherMobile} />
      </Section>

      {/* BANK */}
      <Section title="Bank Details">
        <ProfileItem label="Account Holder" value={data.accountHolderName} />
        <ProfileItem label="Account Number" value={data.accountNumber} />
        <ProfileItem label="Bank Name" value={data.bankName} />
        <ProfileItem label="Branch" value={data.branchName} />
        <ProfileItem label="IFSC" value={data.ifscCode} />
      </Section>

      {/* PROGRAM */}
      <Section title="Admission Details">
        <ProfileItem label="Program Level" value={data.selectedProgramLevel} />
        <ProfileItem label="Preference Locked" value={data.preferenceLocked ? "Yes" : "No"} />
        <ProfileItem label="Profile Locked" value={data.profileLocked ? "Yes" : "No"} />
      </Section>

      {/* BUTTONS */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => navigate("/student/edit-profile")}
          className="bg-yellow-500 text-white px-6 py-2 rounded"
        >
          Edit Profile
        </button>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Back Dashboard
        </button>
      </div>
    </div>
  );
};

// reusable components
const ProfileItem = ({ label, value }) => (
  <div>
    <label className="text-gray-500 text-sm">{label}</label>
    <p className="font-semibold">{value || "-"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="grid grid-cols-2 gap-6">{children}</div>
  </div>
);

export default ViewProfile;
