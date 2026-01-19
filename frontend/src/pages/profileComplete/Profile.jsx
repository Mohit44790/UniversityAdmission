import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { profileBasicDetails } from "../../redux/slices/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile,loading } = useSelector((state) => state.profile);

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

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(profileBasicDetails(formData));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Profile saved successfully");
    } else {
      toast.error(res.payload || "Failed to save profile");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#4C489D]">
        Student Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ================= BASIC DETAILS ================= */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Basic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="date"
              name="dateOfBirth"
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="number"
              name="ageAsOnJuly1_2024"
              placeholder="Age as on 1 July 2024"
              onChange={handleChange}
              className="input"
              required
            />

            <select
              name="gender"
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
              placeholder="Religion"
              onChange={handleChange}
              className="input"
            />

            <input
              name="nationality"
              placeholder="Nationality"
              onChange={handleChange}
              className="input"
            />
          </div>
        </section>

        {/* ================= CONTACT DETAILS ================= */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="alternateEmail"
              placeholder="Alternate Email"
              onChange={handleChange}
              className="input"
            />

            <input
              name="alternateMobile"
              placeholder="Alternate Mobile"
              onChange={handleChange}
              className="input"
            />

            <textarea
              name="permanentAddress"
              placeholder="Permanent Address"
              onChange={handleChange}
              className="input md:col-span-2"
            />

            <textarea
              name="correspondenceAddress"
              placeholder="Correspondence Address"
              onChange={handleChange}
              className="input md:col-span-2"
            />
          </div>
        </section>

        {/* ================= ACADEMIC DETAILS ================= */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Academic Details
          </h2>

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
                placeholder="Previous Enrollment Number"
                onChange={handleChange}
                className="input"
              />
            )}

            <input
              name="programmeRegistered"
              placeholder="Programme Registered"
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              name="yearOfRegistration"
              placeholder="Year of Registration"
              onChange={handleChange}
              className="input"
            />
          </div>
        </section>

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-64 bg-[#4C489D] text-white py-3 rounded-full font-semibold transition
            ${loading ? "opacity-60" : "hover:scale-105"}
          `}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
