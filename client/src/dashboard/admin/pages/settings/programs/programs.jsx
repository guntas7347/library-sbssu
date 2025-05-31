import React, { useEffect, useState } from "react";
import Input from "../../../../../components/forms/input";
import server from "../../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../../components/context/snackbar.context";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";
import ControlButtonCounter from "../../../../../components/forms/counter/control-button";

const ProgramsSettings = () => {
  const setFeedback = useFeedback();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleProgramChange = (index, value) => {
    const updated = [...programs];
    updated[index].name = value;
    setPrograms(updated);
  };
  const handleProgramDurationChange = (index, value) => {
    const updated = [...programs];
    updated[index].duration = value;
    setPrograms(updated);
  };

  const handleSpecializationChange = (pIndex, sIndex, value) => {
    const updated = [...programs];
    updated[pIndex].specialization[sIndex].name = value;
    setPrograms(updated);
  };

  const addProgram = () => {
    setPrograms([
      ...programs,
      {
        name: "",
        duration: 1,
        specialization: [{ name: "NONE" }, { name: "OTHER" }],
      },
    ]);
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
    const specName = updated[pIndex].specialization[sIndex].name;
    if (specName === "NONE" || specName === "OTHER") return;
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
      setFeedback(1, res.m);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const res = await server.settings.fetchSetting("PRO-SPZ-LIST");
        setPrograms(res.p.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
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
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Programs</h2>
      <hr className="c-hr" />
      <div className="mt-4">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-10"
        >
          {programs.map((p, idx) => (
            <div key={idx}>
              <div className="flex items-end gap-4 mt-6">
                <Input
                  label="Program"
                  value={p.name}
                  onChange={(e) => {
                    handleProgramChange(
                      idx,
                      e.target.value.toUpperCase().replace(/[^a-zA-Z-]/g, "")
                    );
                  }}
                  autoComplete="off"
                  required={true}
                />

                <ControlButtonCounter
                  label="Duration (years)"
                  defaultValue={p.duration}
                  onChange={(e) => handleProgramDurationChange(idx, e)}
                  message={false}
                  maxValue={10}
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
                <div className="grid grid-cols-4 gap-x-10">
                  {" "}
                  {p.specialization.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-end gap-4 mt-2">
                      <Input
                        label="Specialization"
                        value={s.name}
                        disabled={s.name === "NONE" || s.name === "OTHER"}
                        onChange={(e) =>
                          handleSpecializationChange(
                            idx,
                            sIdx,
                            e.target.value
                              .toUpperCase()
                              .replace(/[^a-zA-Z-]/g, "")
                          )
                        }
                        autoComplete="off"
                        required={true}
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
                            fillRule="evenodd"
                            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
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
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramsSettings;
