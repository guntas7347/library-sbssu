import React, { useEffect, useState } from "react";
import InputField from "../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { quickSearchMember } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import { useFeedback } from "../../../../components/context/snackbar.context";

const QuickSearchMember = () => {
  const setFeedback = useFeedback();

  const { formFields, handleChange } = useForm({ search: "" });
  const { search } = formFields;

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (search === "") return;

      await quickSearchMember(formFields)
        .then((res) => {
          setRowData(
            processData(res, [
              "_id",
              "fullName",
              "fatherName",
              "dob",
              "rollNumber",
              "membershipId",
            ])
          );
        })
        .catch((error) => console.log(error));
    }, 1000);

    return () => clearTimeout(debounce);
  }, [formFields]);

  return (
    <div className="bg-white rounded-3xl p-10 h-[450px] w-[900px]  gap-10  z-50 opacity-100">
      <h1 className="text-xl font-semibold"> Quick Search Member</h1>
      <div className="mt-3 w-32">
        <InputField
          label="Search"
          name="search"
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <table>
          <thead className="block">
            <tr>
              <td className="w-44">Name</td>
              <td className="w-44">Father&apos;s Name</td>
              <td className="w-44">Date of Birth</td>
              <td className="w-44">Roll Number</td>
              <td className="w-44">Membership Id</td>
            </tr>
          </thead>
          <tbody className="block max-h-[220px] overflow-y-auto">
            {rowData.map((element, index) => {
              return (
                <tr key={index} onClick={() => console.log(element[0])}>
                  <td className="w-44"> {element[1]} </td>
                  <td className="w-44"> {element[2]} </td>
                  <td className="w-44">
                    {new Date(element[3]).toDateString()}
                  </td>
                  <td className="w-44"> {element[4]} </td>
                  <td className="w-44"> {element[5]} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuickSearchMember;
