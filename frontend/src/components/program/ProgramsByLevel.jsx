import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramLevels } from "../../redux/slices/programLevelSlice";
import { fetchProgramsByLevel } from "../../redux/slices/programSlice";
import { useNavigate } from "react-router-dom";

const ProgramsByLevel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: levels } = useSelector((s) => s.programLevel);
  const { list: programs } = useSelector((s) => s.program);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // fetch levels
  useEffect(() => {
    dispatch(fetchProgramLevels());

    // check localStorage for saved level
    const savedLevel = localStorage.getItem("selectedLevel");
    if (savedLevel) {
      setSelectedLevel(savedLevel);
      setConfirmed(true);
      dispatch(fetchProgramsByLevel(savedLevel));
    }
  }, []);

  // fetch programs on level change
  useEffect(() => {
    if (selectedLevel && !confirmed) {
      dispatch(fetchProgramsByLevel(selectedLevel));
    }
  }, [selectedLevel]);

  // confirm selection
  const handleConfirm = () => {
    if (!selectedLevel) {
      alert("Please select program level");
      return;
    }

    setConfirmed(true);
    
  };

  // next page
  const handleNext = () => {
    navigate("/student/preferences");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl text-blue-600 font-bold mb-4">
        Select Program Level
      </h2>

      {/* dropdown */}
      {!confirmed ? (
        <select
          className="border p-2 rounded w-64"
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
          }}
        >
          <option value="">Select Level</option>
          {levels.map((l) => (
            <option key={l.id} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-green-50 border border-green-300 px-4 py-2 rounded w-fit">
          <span className="font-semibold text-green-700">
            Selected Level:
          </span>{" "}
          {levels.find((l) => l.code === selectedLevel)?.name}
        </div>
      )}

      {/* programs preview */}
      {selectedLevel && (
        <div className="mt-4">
          <h3 className="font-semibold">Available Programs:</h3>
          <ul className="list-disc ml-6">
            {programs.map((p) => (
              <li key={p.id}>{p.programName}</li>
            ))}
          </ul>
        </div>
      )}

      {/* confirm button */}
      {selectedLevel && !confirmed && (
        <button
          onClick={handleConfirm}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Confirm Selection
        </button>
      )}

      {/* next button */}
      {confirmed && (
        <button
          onClick={handleNext}
          className="mt-4 bg-green-600 cursor-pointer text-white px-6 py-2 rounded"
        >
          Next Preference
        </button>
      )}
    </div>
  );
};

export default ProgramsByLevel;
