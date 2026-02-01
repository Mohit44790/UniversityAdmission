import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramLevels } from "../../redux/slices/programLevelSlice";
import { fetchProgramsByLevel } from "../../redux/slices/programSlice";

const ProgramsByLevel = () => {
  const dispatch = useDispatch();
  const { list: levels } = useSelector((s) => s.programLevel);
  const { list: programs } = useSelector((s) => s.program);

  const [level, setLevel] = useState("");

  useEffect(() => {
    dispatch(fetchProgramLevels());
  }, []);

  useEffect(() => {
    if (level) {
      dispatch(fetchProgramsByLevel(level));
    }
  }, [level]);

  return (
    <div>
      <select onChange={(e) => setLevel(e.target.value)}>
        <option value="">Select Level</option>
        {levels.map((l) => (
          <option key={l.id} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>

      <ul>
        {programs.map((p) => (
          <li key={p.id}>{p.programName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramsByLevel;
