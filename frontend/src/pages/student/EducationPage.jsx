import { useDispatch, useSelector } from "react-redux";
import { saveEducation } from "../../redux/slices/studentEducationSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EducationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((s) => s.education);

  const programLevel = localStorage.getItem("selectedLevel");

  const [form, setForm] = useState({
    passed8: false,
    passed10: false,
    passed12: false,
    iti: false,
    ug: false,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (field) => {
    setForm({ ...form, [field]: !form[field] });
  };

  const save = async () => {
    await dispatch(saveEducation({ programLevel, data: form }));
    navigate("/student/rank");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Education Qualification
      </h2>

      {/* Program level indicator */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
        <p className="text-sm text-gray-700">
          Selected Program Level:
        </p>
        <p className="font-semibold text-blue-700">
          {programLevel}
        </p>
      </div>

      {/* Checkbox grid */}
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.passed8}
            onChange={() => handleChange("passed8")}
          />
          Passed 8th
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.passed10}
            onChange={() => handleChange("passed10")}
          />
          Passed 10th
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.passed12}
            onChange={() => handleChange("passed12")}
          />
          Passed 12th
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.iti}
            onChange={() => handleChange("iti")}
          />
          ITI Completed
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.ug}
            onChange={() => handleChange("ug")}
          />
          UG Completed
        </label>
      </div>

      {/* Info */}
      <div className="mt-6 text-sm text-gray-600">
        * Select all qualifications you have completed.
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-400 text-white px-6 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={save}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  );
};

export default EducationPage;
