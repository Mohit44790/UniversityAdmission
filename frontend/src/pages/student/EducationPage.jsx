import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducation,
  saveEducation,
  deleteEducation,
} from "../../redux/slices/studentEducationSlice";
import { useNavigate } from "react-router-dom";

const EducationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((s) => s.education);

  const [form, setForm] = useState({
    passed8: false,
    passed10: false,
    passed12: false,
    iti: false,
    ug: false,
  });

  const programLevel = localStorage.getItem("selectedLevel");

  useEffect(() => {
    dispatch(fetchEducation());
  }, []);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (field) => {
    setForm({ ...form, [field]: !form[field] });
  };

  const handleSave = async () => {
    await dispatch(saveEducation({ programLevel, data: form }));
    alert("Education saved successfully");
  };

  const handleDelete = async () => {
    await dispatch(deleteEducation());
    alert("Education removed");
  };

  const goNext = () => {
    navigate("/student/rank");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Education Details</h2>

      <div className="grid gap-3">
        <label>
          <input
            type="checkbox"
            checked={form.passed8}
            onChange={() => handleChange("passed8")}
          />
          Passed 8th
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.passed10}
            onChange={() => handleChange("passed10")}
          />
          Passed 10th
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.passed12}
            onChange={() => handleChange("passed12")}
          />
          Passed 12th
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.iti}
            onChange={() => handleChange("iti")}
          />
          ITI
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.ug}
            onChange={() => handleChange("ug")}
          />
          UG Completed
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Save Education
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Delete
        </button>

        <button
          onClick={goNext}
          className="bg-blue-700 text-white px-6 py-2 rounded"
        >
          Next → Rank
        </button>
      </div>
    </div>
  );
};

export default EducationPage;
