import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramCollegesByLevel } from "../../redux/slices/programCollegeSlice";
import api from "../../redux/config/api";
import { useNavigate } from "react-router-dom";

const PreferencePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((s) => s.programCollege);

  const [preferences, setPreferences] = useState([]);
  const [locked, setLocked] = useState(false);
  const [saving, setSaving] = useState(false);

  const level = localStorage.getItem("selectedLevel");

  // Load program colleges
  useEffect(() => {
    if (level) dispatch(fetchProgramCollegesByLevel(level));
  }, [level]);

  // Load lock state
  useEffect(() => {
    const savedLock = localStorage.getItem("prefLocked");
    if (savedLock === "true") setLocked(true);
  }, []);

  // ==========================
  // ADD PREFERENCE
  // ==========================
  const addPreference = (pc) => {
    if (locked) return alert("Preferences already locked");

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

  // ==========================
  // REMOVE
  // ==========================
  const removePreference = (id) => {
    if (locked) return;

    const updated = preferences.filter((p) => p.id !== id);
    setPreferences(updated.map((p, i) => ({ ...p, order: i + 1 })));
  };

  // ==========================
  // REORDER
  // ==========================
  const moveUp = (index) => {
    if (index === 0 || locked) return;

    const updated = [...preferences];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setPreferences(updated.map((p, i) => ({ ...p, order: i + 1 })));
  };

  const moveDown = (index) => {
    if (index === preferences.length - 1 || locked) return;

    const updated = [...preferences];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setPreferences(updated.map((p, i) => ({ ...p, order: i + 1 })));
  };

  // ==========================
  // SAVE
  // ==========================
  const handleSubmit = async () => {
    if (preferences.length < 2) {
      return alert("Minimum 8 preferences required");
    }

    try {
      setSaving(true);

      const payload = preferences.map((p, i) => ({
        programCollege: { id: p.id },
        preferenceOrder: i + 1,
      }));

      await api.post("/api/student/preferences", payload);
      alert("Preferences saved successfully");
    } catch (err) {
      alert("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // LOCK
  // ==========================
  const lockPreferences = async () => {
    if (preferences.length < 2) {
      return alert("Minimum 8 preferences required before locking");
    }

    try {
      await api.post("/api/student/preferences/lock");
      localStorage.setItem("prefLocked", "true");
      setLocked(true);
      alert("Preferences locked successfully");
    } catch {
      alert("Failed to lock preferences");
    }
  };

  // ==========================
  // NEXT PAGE
  // ==========================
  const goNext = () => {
    if (!locked) return alert("Lock preferences first");
    navigate("/student/qualification-details");
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

            {!locked && (
              <button
                onClick={() => addPreference(pc)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Add Preference
              </button>
            )}
          </div>
        ))}
      </div>

      {/* SELECTED PREFERENCES */}
      <div className="mt-6">
        <h3 className="font-semibold">Your Preferences</h3>

        {preferences.map((p, index) => (
          <div
            key={p.id}
            className="flex justify-between items-center border p-2 mt-2 rounded"
          >
            <span>
              {p.order}. {p.program} - {p.college}
            </span>

            {!locked && (
              <div className="flex gap-2">
                <button onClick={() => moveUp(index)}>⬆</button>
                <button onClick={() => moveDown(index)}>⬇</button>
                <button
                  onClick={() => removePreference(p.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SAVE */}
      {!locked && preferences.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
        >
          Save Preferences
        </button>
      )}

      {/* LOCK */}
      {!locked && preferences.length >= 2 && (
        <button
          onClick={lockPreferences}
          className="mt-6 ml-3 bg-red-600 text-white px-6 py-2 rounded"
        >
          🔒 Lock Preferences
        </button>
      )}

      {/* NEXT */}
      {locked && (
        <button
          onClick={goNext}
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded"
        >
          Next → Education
        </button>
      )}
    </div>
  );
};

export default PreferencePage;
