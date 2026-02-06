import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramCollegesByLevel } from "../../redux/slices/programCollegeSlice";
import api from "../../redux/config/api";

const PreferencePage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.programCollege);

  const [preferences, setPreferences] = useState([]);

  const level = localStorage.getItem("selectedLevel");

  useEffect(() => {
    if (level) {
      dispatch(fetchProgramCollegesByLevel(level));
    }
  }, [level]);

  // add preference
  const addPreference = (pc) => {
    const exists = preferences.find((p) => p.id === pc.id);
    if (exists) return alert("Already added");

    setPreferences([
      ...preferences,
      {
        id: pc.id,
        program: pc.program.programName,
        college: pc.college.collegeName,
        order: preferences.length + 1,
      },
    ]);
  };

  // remove preference
  const removePreference = (id) => {
    const updated = preferences.filter((p) => p.id !== id);
    setPreferences(
      updated.map((p, i) => ({
        ...p,
        order: i + 1,
      }))
    );
  };

  // submit
  const handleSubmit = async () => {
    const payload = preferences.map((p, i) => ({
      programCollege: { id: p.id },
      preferenceOrder: i + 1,
    }));

    await api.post("/api/student/preferences", payload);
    alert("Preferences saved successfully");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select Program & College</h2>

      {/* PROGRAM COLLEGE LIST */}
      <div className="grid grid-cols-2 gap-4">
        {list.map((pc) => (
          <div key={pc.id} className="border p-3 rounded shadow">
            <h3 className="font-semibold">{pc.program.programName}</h3>
            <p>{pc.college.collegeName}</p>

            <button
              onClick={() => addPreference(pc)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add Preference
            </button>
          </div>
        ))}
      </div>

      {/* SELECTED PREFERENCES */}
      <div className="mt-6">
        <h3 className="font-semibold">Your Preferences</h3>

        {preferences.map((p) => (
          <div
            key={p.id}
            className="flex justify-between border p-2 mt-2 rounded"
          >
            <span>
              {p.order}. {p.program} - {p.college}
            </span>

            <button
              onClick={() => removePreference(p.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      {preferences.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit Preferences
        </button>
      )}
    </div>
  );
};

export default PreferencePage;
