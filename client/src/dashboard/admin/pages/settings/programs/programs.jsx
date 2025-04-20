import React, { useContext, useEffect, useState } from "react";
import Input from "../../../../../components/forms/input";
import server from "../../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const ProgramsSettings = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleProgramChange = (index, value) => {
    const updated = [...programs];
    updated[index].name = value;
    setPrograms(updated);
  };

  const handleSpecializationChange = (pIndex, sIndex, value) => {
    const updated = [...programs];
    updated[pIndex].specialization[sIndex].name = value;
    setPrograms(updated);
  };

  const addProgram = () => {
    setPrograms([...programs, { name: "", specialization: [] }]);
  };

  const deleteProgram = (index) => {
    const updated = programs.filter((_, i) => i !== index);
    setPrograms(updated);
  };

  const addSpecialization = (index) => {
    const updated = [...programs];
    updated[index].specialization.push({ name: "" });
    setPrograms(updated);
  };

  const deleteSpecialization = (pIndex, sIndex) => {
    const updated = [...programs];
    updated[pIndex].specialization = updated[pIndex].specialization.filter(
      (_, i) => i !== sIndex
    );
    setPrograms(updated);
  };

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "PRO-SPZ-LIST",
        value: programs,
      });
      setFeedback([1, 1, res]);
      setLoading(true);
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const res = await server.settings.fetchSetting("PRO-SPZ-LIST");
        setPrograms(res.value);
        setLoading(false);
      } catch (error) {
        setFeedback([1, 2, error]);
      }
    };
    f();
  }, [loading]);

  if (loading)
    return (
      <div className="min-h-96 flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-semibold">Programs</h2>
      <div className="mt-4">
        {programs.map((p, idx) => (
          <div key={idx}>
            <div className="flex items-end gap-4 mt-6">
              <Input
                label="Program"
                value={p.name}
                onChange={(e) => handleProgramChange(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => deleteProgram(idx)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete Program
              </button>
              <button
                type="button"
                onClick={() => addSpecialization(idx)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Specialization
              </button>
            </div>

            <div className="ml-10 mt-4">
              <label className="text-sm font-medium">Specializations</label>
              {p.specialization.map((s, sIdx) => (
                <div key={sIdx} className="flex items-end gap-4 mt-2">
                  <Input
                    value={s.name}
                    onChange={(e) =>
                      handleSpecializationChange(idx, sIdx, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => deleteSpecialization(idx, sIdx)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-10">
          <button
            type="button"
            onClick={addProgram}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Add Program
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramsSettings;
