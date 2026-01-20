import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { profileBasicDetails } from "../../redux/slices/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    ageAsOnJuly1_2024: "",
    gender: "",
    category: "",
    religion: "",
    nationality: "",
    alternateEmail: "",
    alternateMobile: "",
    permanentAddress: "",
    correspondenceAddress: "",
    enrolledBefore: false,
    enrollmentNumber: "",
    programmeRegistered: "",
    yearOfRegistration: "",
  });

  // ================= PREFILL FORM =================
  useEffect(() => {
    if (profile) {
      setFormData({
        ...formData,
        fullName: profile.fullName || "",
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.slice(0, 10)
          : "",
        ageAsOnJuly1_2024: profile.ageAsOnJuly1_2024 || "",
        gender: profile.gender || "",
        category: profile.category || "",
        religion: profile.religion || "",
        nationality: profile.nationality || "",
        alternateEmail: profile.alternateEmail || "",
        alternateMobile: profile.alternateMobile || "",
        permanentAddress: profile.permanentAddress || "",
        correspondenceAddress: profile.correspondenceAddress || "",
        enrolledBefore: profile.enrolledBefore || false,
        enrollmentNumber: profile.enrollmentNumber || "",
        programmeRegistered: profile.programmeRegistered || "",
        yearOfRegistration: profile.yearOfRegistration || "",
      });
    }
  }, [profile]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct payload safely
    const payload = {
      ...formData,
      enrollmentNumber: formData.enrolledBefore
        ? formData.enrollmentNumber || null
        : null,
      yearOfRegistration: formData.yearOfRegistration
        ? Number(formData.yearOfRegistration)
        : null,
      ageAsOnJuly1_2024: formData.ageAsOnJuly1_2024
        ? Number(formData.ageAsOnJuly1_2024)
        : null,
    };

    try {
      const res = await dispatch(profileBasicDetails(payload));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Profile saved successfully");
      } else {
        toast.error(res.payload || "Failed to save profile");
      }
    } catch (err) {
      console.error("Profile save error:", err);
      toast.error("Something went wrong while saving profile");
    }
  };

  // ================= UI =================
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#4C489D]">
        Student Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ================= BASIC DETAILS ================= */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input"
              placeholder="Full Name"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="number"
              name="ageAsOnJuly1_2024"
              value={formData.ageAsOnJuly1_2024}
              onChange={handleChange}
              className="input"
              placeholder="Age as on 1 July 2024"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Category</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
            </select>
            <input
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="input"
              placeholder="Religion"
            />
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="input"
              placeholder="Nationality"
            />
          </div>
        </section>

        {/* ================= CONTACT DETAILS ================= */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              className="input"
              placeholder="Alternate Email"
            />
            <input
              name="alternateMobile"
              value={formData.alternateMobile}
              onChange={handleChange}
              className="input"
              placeholder="Alternate Mobile"
            />
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="input md:col-span-2"
              placeholder="Permanent Address"
            />
            <textarea
              name="correspondenceAddress"
              value={formData.correspondenceAddress}
              onChange={handleChange}
              className="input md:col-span-2"
              placeholder="Correspondence Address"
            />
          </div>
        </section>

        {/* ================= ACADEMIC DETAILS ================= */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Academic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="enrolledBefore"
                checked={formData.enrolledBefore}
                onChange={handleChange}
              />
              Enrolled before?
            </label>

            {formData.enrolledBefore && (
              <input
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                className="input"
                placeholder="Previous Enrollment Number"
                required
              />
            )}

            <input
              name="programmeRegistered"
              value={formData.programmeRegistered}
              onChange={handleChange}
              className="input"
              placeholder="Programme Registered"
            />
            <input
              type="number"
              name="yearOfRegistration"
              value={formData.yearOfRegistration}
              onChange={handleChange}
              className="input"
              placeholder="Year of Registration"
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-64 bg-[#4C489D] text-white py-3 rounded-full font-semibold transition
            ${loading ? "opacity-60" : "hover:scale-105"}`}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
