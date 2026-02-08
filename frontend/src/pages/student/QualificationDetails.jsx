import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QualificationDetails = () => {
  const [form, setForm] = useState({
    resultStatus: "",
    yearOfPassing: "",
    percentage: "",
    division: "",
    institution: "",
    board: "",
    subjects: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.resultStatus) newErrors.resultStatus = "Select result status";
    if (!form.yearOfPassing)
      newErrors.yearOfPassing = "Year of passing cannot be blank";
    if (!form.percentage) newErrors.percentage = "Enter percentage";
    if (!form.institution)
      newErrors.institution = "Institution name required";
    if (!form.board) newErrors.board = "Board/University required";
    if (!form.subjects)
      newErrors.subjects = "Subject combination required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = () => {
    if (!validate()) return;

    console.log("Qualification Data:", form);

    // navigate to subject marks page
    navigate("/student/subject-marks");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6">
        Qualification Details – X or 8th
      </h2>

      {/* RESULT STATUS + YEAR */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1">
            Result Status <span className="text-red-500">*</span>
          </label>

          <select
            value={form.resultStatus}
            onChange={(e) => handleChange("resultStatus", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="PASSED">Passed</option>
            <option value="APPEARING">Appeared/Appearing</option>
          </select>

          {errors.resultStatus && (
            <p className="text-red-500 text-sm">{errors.resultStatus}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Year of passing <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            placeholder="Enter year"
            value={form.yearOfPassing}
            onChange={(e) => handleChange("yearOfPassing", e.target.value)}
            className="w-full border p-2 rounded"
          />

          {errors.yearOfPassing && (
            <p className="text-red-500 text-sm">{errors.yearOfPassing}</p>
          )}
        </div>
      </div>

      {/* PERCENTAGE + DIVISION */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1">
            Percentage <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            placeholder="Enter percentage"
            value={form.percentage}
            onChange={(e) => handleChange("percentage", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <p className="text-xs text-gray-500">
            If marks are in CGPA convert to percentage
          </p>

          {errors.percentage && (
            <p className="text-red-500 text-sm">{errors.percentage}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Division</label>

          <select
            value={form.division}
            onChange={(e) => handleChange("division", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="FIRST">First</option>
            <option value="SECOND">Second</option>
            <option value="THIRD">Third</option>
          </select>
        </div>
      </div>

      {/* INSTITUTION + BOARD */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1">
            Name of Institution <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="School name"
            value={form.institution}
            onChange={(e) => handleChange("institution", e.target.value)}
            className="w-full border p-2 rounded"
          />

          {errors.institution && (
            <p className="text-red-500 text-sm">{errors.institution}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Board / University <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="CBSE / ICSE / State Board"
            value={form.board}
            onChange={(e) => handleChange("board", e.target.value)}
            className="w-full border p-2 rounded"
          />

          {errors.board && (
            <p className="text-red-500 text-sm">{errors.board}</p>
          )}
        </div>
      </div>

      {/* SUBJECT COMBINATION */}
      <div className="mb-6">
        <label className="block font-medium mb-1">
          Subject Combination <span className="text-red-500">*</span>
        </label>

        <textarea
          placeholder="Maths, Science, English..."
          value={form.subjects}
          onChange={(e) => handleChange("subjects", e.target.value)}
          className="w-full border p-2 rounded"
        />

        {errors.subjects && (
          <p className="text-red-500 text-sm">{errors.subjects}</p>
        )}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
        >
          Save Qualification
        </button>
      </div>
    </div>
  );
};

export default QualificationDetails;
