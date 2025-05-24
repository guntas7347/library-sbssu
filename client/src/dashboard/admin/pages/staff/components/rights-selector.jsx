import React, { useEffect, useState } from "react";
import Select from "../../../../../components/forms/select-input";

const RightsSelector = ({ onChange, defaultRights = [] }) => {
  const [rights, setRights] = useState(defaultRights);

  const handleAddRight = (e) => {
    const { value } = e.target;
    if (rights.includes(value)) return;

    if (value === "admin") {
      setRights([value]);
      return;
    }
    if (value === "none") {
      setRights([]);
      return;
    }
    if (rights.includes("admin")) {
      const newRights = rights.filter((right) => right !== "admin");
      setRights([...newRights, value]);
      return;
    }
    setRights([...rights, value]);
  };

  const handleRemoveRight = (idx) => {
    const newRights = [...rights];
    newRights.splice(idx, 1);
    setRights(newRights);
  };

  useEffect(() => {
    onChange({
      target: {
        name: "rights",
        value: rights,
      },
    });
  }, [rights]);

  return (
    <div>
      <h1 className="text-xl font-semibold">Add staff rights:-</h1>
      <div>
        <Select
          onChange={handleAddRight}
          autoFire={false}
          label="Rights"
          name="right"
          options={[
            "none",
            "admin",
            "view-member",
            "search-members",
            "export-members",
            "view-applicant",
            "search-applicants",
            "approve-applicant",
            "export-applicants",
            "create-card",
            "view-book",
            "search-books",
            "create-book",
            "create-accession",
            "export-books",
            "view-issued-book",
            "search-issued-books",
            "issue-book",
            "export-issued-books",
            "view-returned-book",
            "search-returned-books",
            "return-book",
            "export-returned-books",
            "view-staff",
            "search-staff",
            "view-transaction",
            "search-transactions",
            "create-transaction",
          ]}
        />
        <div className="grid grid-cols-2 gap-3 my-3">
          {rights.map((right, idx) => {
            return (
              <div
                key={idx}
                className="border px-2 py-1 rounded flex justify-between bg-gray-200 dark:bg-gray-500"
              >
                <span className=" uppercase">{right}</span>

                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => handleRemoveRight(idx)}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightsSelector;
