import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveFamilyDetails } from "../../redux/slices/profileSlice";

const Family = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    motherName: "",
    motherMobile: "",
    fatherName: "",
    fatherMobile: "",
    emergencyContact: "",
    familyIncome: "",
  });

  // Prefill form if profile exists
  useEffect(() => {
    if (profile) {
      setFormData({
        motherName: profile.motherName || "",
        motherMobile: profile.motherMobile || "",
        fatherName: profile.fatherName || "",
        fatherMobile: profile.fatherMobile || "",
        emergencyContact: profile.emergencyContact || "",
        familyIncome: profile.familyIncome || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numeric fields
    const payload = {
      ...formData,
      familyIncome: formData.familyIncome ? Number(formData.familyIncome) : 0,
    };

    const res = await dispatch(saveFamilyDetails(payload));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Family details saved successfully!");
    } else {
      toast.error(res.payload || "Failed to save family details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-[#4C489D]">Family Details</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="input"
            placeholder="Mother's Name"
            required
          />
          <input
            name="motherMobile"
            value={formData.motherMobile}
            onChange={handleChange}
            className="input"
            placeholder="Mother's Mobile"
            required
          />
          <input
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="input"
            placeholder="Father's Name"
            required
          />
          <input
            name="fatherMobile"
            value={formData.fatherMobile}
            onChange={handleChange}
            className="input"
            placeholder="Father's Mobile"
            required
          />
          <input
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="input"
            placeholder="Emergency Contact"
            required
          />
          <input
            type="number"
            name="familyIncome"
            value={formData.familyIncome}
            onChange={handleChange}
            className="input"
            placeholder="Family Income"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-64 bg-[#4C489D] text-white py-3 rounded-full font-semibold transition
            ${loading ? "opacity-60" : "hover:scale-105"}`}
        >
          {loading ? "Saving..." : "Save Family Details"}
        </button>
      </form>
    </div>
  );
};

export default Family;
