import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile, finalSubmitProfile } from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const ReviewSubmitPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((s) => s.profile);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  const handleSubmit = async () => {
    const confirm = window.confirm(
      "After final submit, profile will be locked. Continue?"
    );

    if (!confirm) return;

    try {
      await dispatch(finalSubmitProfile()).unwrap();
      alert("Profile submitted successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err);
    }
  };

  if (loading || !profile) {
    return <div className="p-6 text-center">Loading review...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-6">
        Review Application & Final Submit
      </h2>

      {/* APPLICATION STATUS */}
      <div className="mb-6 p-4 border rounded bg-yellow-50">
        <p className="font-semibold">
          Application Status: {profile.applicationStatus}
        </p>
        <p className="text-sm text-gray-600">
          Profile Locked: {profile.profileLocked ? "Yes" : "No"}
        </p>
      </div>

      {/* BASIC DETAILS */}
      <Section title="Basic Details">
        <Item label="Full Name" value={profile.fullName} />
        <Item label="Email" value={profile.userId} />
        <Item label="Gender" value={profile.gender} />
        <Item label="Category" value={profile.category} />
        <Item label="DOB" value={profile.dateOfBirth} />
      </Section>

      {/* FAMILY */}
      <Section title="Family Details">
        <Item label="Father Name" value={profile.fatherName} />
        <Item label="Mother Name" value={profile.motherName} />
        <Item label="Emergency Contact" value={profile.emergencyContact} />
        <Item label="Family Income" value={profile.familyIncome} />
      </Section>

      {/* BANK */}
      <Section title="Bank Details">
        <Item label="Account Holder" value={profile.accountHolderName} />
        <Item label="Bank" value={profile.bankName} />
        <Item label="IFSC" value={profile.ifscCode} />
      </Section>

      {/* PROGRAM */}
      <Section title="Admission Details">
        <Item label="Selected Program Level" value={profile.selectedProgramLevel} />
        <Item label="Preference Locked" value={profile.preferenceLocked ? "Yes" : "No"} />
      </Section>

      {/* DOCUMENTS */}
      <Section title="Uploaded Documents">
        <Item label="Photo" value={profile.photoPath ? "Uploaded" : "Missing"} />
        <Item label="Signature" value={profile.signaturePath ? "Uploaded" : "Missing"} />
        <Item label="10th Marksheet" value={profile.marksheet10Path ? "Uploaded" : "Missing"} />
        <Item label="12th Marksheet" value={profile.marksheet12Path ? "Uploaded" : "Optional"} />
      </Section>

      {/* FINAL SUBMIT */}
      <div className="flex justify-end mt-10">
        {!profile.profileLocked ? (
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded text-lg"
          >
            🔒 Lock & Final Submit
          </button>
        ) : (
          <div className="text-green-600 font-semibold">
            Profile already submitted
          </div>
        )}
      </div>
    </div>
  );
};

// reusable components

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-3">{title}</h3>
    <div className="grid grid-cols-2 gap-6">{children}</div>
  </div>
);

const Item = ({ label, value }) => (
  <div>
    <label className="text-gray-500 text-sm">{label}</label>
    <p className="font-semibold">{value || "-"}</p>
  </div>
);

export default ReviewSubmitPage;
