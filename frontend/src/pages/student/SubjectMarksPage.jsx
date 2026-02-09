import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveMarks } from "../../redux/slices/studentEducationSlice";
import { useDispatch } from "react-redux";

const SUBJECT_OPTIONS = [
  "Accountancy",
  "Maths",
  "Science",
  "English",
  "Computer",
  "Economics",
  "Business Studies",
  "Physics",
  "Chemistry",
  "Biology",
];

const SubjectMarksPage = () => {
  const [subjects, setSubjects] = useState([
    { subject: "", total: "", obtained: "" },
    { subject: "", total: "", obtained: "" },
    { subject: "", total: "", obtained: "" },
    { subject: "", total: "", obtained: "" },
    { subject: "", total: "", obtained: "" },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  // ==============================
  // CALCULATIONS
  // ==============================
  const totalMax = subjects.reduce(
    (sum, s) => sum + Number(s.total || 0),
    0
  );

  const totalObtained = subjects.reduce(
    (sum, s) => sum + Number(s.obtained || 0),
    0
  );

  const percentage =
    totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;

  // ==============================
  // SAVE
  // ==============================
 const handleSave = async () => {
  // remove empty rows
  const filtered = subjects.filter(
    (s) => s.subject && s.total && s.obtained
  );

  if (filtered.length === 0) {
    alert("Please enter at least one subject");
    return;
  }

  // validation
  for (let s of filtered) {
    if (Number(s.obtained) > Number(s.total)) {
      alert(`Obtained marks cannot be greater than total in ${s.subject}`);
      return;
    }
  }

  // backend payload
  const payload = filtered.map((s) => ({
    subject: s.subject,
    totalMarks: parseInt(s.total),
    obtainedMarks: parseInt(s.obtained),
  }));

  console.log("FINAL PAYLOAD SENT →", JSON.stringify(payload));

  try {
    await dispatch(saveMarks(payload)).unwrap();

    alert("Marks saved successfully");
    navigate("/student/upload-documents");
  } catch (err) {
    console.error("API ERROR →", err);
    alert(err || "Failed to save marks");
  }
};



  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6">Subject Marks Details</h2>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-3 font-semibold mb-3 text-gray-700">
        <div>NAME OF THE SUBJECT</div>
        <div>TOTAL MARKS</div>
        <div>OBTAINED MARKS</div>
      </div>

      {/* SUBJECT ROWS */}
      {subjects.map((row, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-3">
          {/* SUBJECT */}
          <select
            value={row.subject}
            onChange={(e) =>
              handleChange(index, "subject", e.target.value)
            }
            className="border p-2 rounded"
          >
            <option value="">Select a subject</option>
            {SUBJECT_OPTIONS.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          {/* TOTAL */}
          <input
            type="number"
            placeholder="Total Marks"
            value={row.total}
            onChange={(e) =>
              handleChange(index, "total", e.target.value)
            }
            className="border p-2 rounded"
          />

          {/* OBTAINED */}
          <input
            type="number"
            placeholder="Obtained Marks"
            value={row.obtained}
            onChange={(e) =>
              handleChange(index, "obtained", e.target.value)
            }
            className="border p-2 rounded"
          />
        </div>
      ))}

      {/* TOTALS */}
      <div className="flex justify-between mt-6 font-semibold">
        <div>Percentage: {percentage}%</div>
        <div>Max Total: {totalMax.toFixed(2)}</div>
        <div>Total Obtained: {totalObtained.toFixed(2)}</div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default SubjectMarksPage;
