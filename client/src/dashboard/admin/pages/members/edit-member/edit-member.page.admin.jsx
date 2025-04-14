import { useContext, useEffect, useState } from "react";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useParams } from "react-router-dom";
import {
  editExistingStudent,
  fetchStudentById,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const EditStudentPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);

  const academicPrograms = [
    {
      value: "BTECH",
      name: "Bachelor of Technology",
      branches: [
        { name: "Computer Science and Engineering", value: "CSE" },
        { name: "Electrical Engineering", value: "EE" },
        { name: "Mechanical Engineering", value: "ME" },
        { name: "Civil Engineering", value: "CE" },
        { name: "Electronics and Communication Engineering", value: "ECE" },
        { name: "Information Technology", value: "IT" },
        { name: "Chemical Engineering", value: "ChemE" },
      ],
    },
    {
      value: "BCA",
      name: "Bachelor of Computer Applications",
      branches: [
        {
          value: "CS",
          name: "Computer Science",
        },
        {
          value: "IT",
          name: "Information Technology",
        },
        {
          value: "SE",
          name: "Software Engineering",
        },
        {
          value: "DBMS",
          name: "Database Management System",
        },
        {
          value: "NW",
          name: "Networking",
        },
      ],
    },
    {
      value: "BSC",
      name: "Bachelor of Science",
      branches: [
        {
          value: "Math",
          name: "Mathematics",
        },
        {
          value: "Physics",
          name: "Physics",
        },
        {
          value: "Chem",
          name: "Chemistry",
        },
        {
          value: "Bio",
          name: "Biology",
        },
        {
          value: "CompSci",
          name: "Computer Science",
        },
      ],
    },
    {
      value: "BBA",
      name: "Bachelor of Business Administration",
      branches: [
        {
          value: "Mkt",
          name: "Marketing",
        },
        {
          value: "Fin",
          name: "Finance",
        },
        {
          value: "HR",
          name: "Human Resources",
        },
        {
          value: "Ops",
          name: "Operations",
        },
        {
          value: "Mgmt",
          name: "Management",
        },
      ],
    },
    {
      value: "BA",
      name: "Bachelor of Arts",
    },
    {
      value: "BCom",
      name: "Bachelor of Commerce",
    },
    {
      value: "BED",
      name: "Bachelor of Education",
    },
    {
      value: "BPHARMA",
      name: "Bachelor of Pharmacy",
    },
    {
      value: "BARCH",
      name: "Bachelor of Architecture",
    },
    {
      value: "OTHER",
      name: "Other",
    },
  ];

  const defaultFormFields = {
    rollNumber: "",
    fullName: "",
    fatherName: "",
    gender: "",
    category: "",
    dob: "",
    program: "",
    specialization: "",
    batch: "",
    email: "",
    phoneNumber: "",
  };
  const { formFields, handleChange, setFormFields } =
    useForm(defaultFormFields);
  const {
    rollNumber,
    fullName,
    fatherName,
    gender,
    dob,
    category,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
  } = formFields;

  const generateBatchYears = () => {
    const array = [];
    for (
      let i = new Date().getFullYear();
      i >= new Date().getFullYear() - 6;
      i--
    ) {
      array.push({ name: i.toString(), value: i });
    }
    return array;
  };

  const generateSpecialization = () => {
    try {
      const selectedBranch = academicPrograms.find((obj) => {
        return obj.value === program;
      });
      if (selectedBranch) {
        if (Object.hasOwnProperty.call(selectedBranch, "branches"))
          return selectedBranch.branches;
        else return [{ name: "", value: "" }];
      } else return [{ name: "", value: "" }];
    } catch (error) {
      return [{ name: "", value: "" }];
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStudentById(_id)
        .then((studentDoc) => {
          setFormFields({ ...studentDoc });
        })
        .catch((err) => setFeedback([1, 2, err]));
    };
    asyncFunc();
  }, []);

  const handleSubmit = async () => {
    await editExistingStudent(formFields)
      .then((res) => setFeedback([1, 1, res]))
      .catch((err) => setFeedback([1, 2, err]));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Edit Student Details
      </h1>
      <div className="bg-white p-5 rounded-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid md:grid-cols-2 gap-x-10 gap-5 justify-center items-center">
            <InputField
              label="Roll Number"
              type="number"
              name="rollNumber"
              value={rollNumber}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
            <InputSelect
              label="Batch"
              name="batch"
              fields={generateBatchYears()}
              value={batch}
              onChange={handleChange}
            />
            <InputField
              label="Name"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />
            <InputField
              label="Father's Name"
              type="text"
              name="fatherName"
              value={fatherName}
              onChange={handleChange}
            />
            <InputField
              label="Date of Birth"
              type="date"
              name="dob"
              value={dob.slice(0, 10)}
              onChange={handleChange}
            />
            <InputSelect
              label="Gender"
              name="gender"
              fields={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" },
              ]}
              value={gender}
              onChange={handleChange}
            />
            <InputSelect
              label="Category"
              name="category"
              fields={[
                { name: "General", value: "general" },
                { name: "SC/ST", value: "SCST" },
                { name: "Other", value: "other" },
              ]}
              value={category}
              onChange={handleChange}
            />
            <InputSelect
              label="Program"
              name="program"
              fields={academicPrograms}
              value={program}
              onChange={handleChange}
            />
            <InputSelect
              label="Specialization"
              name="specialization"
              fields={generateSpecialization()}
              value={specialization}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <InputField
              label="Phone Number"
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </div>
          <div className="mt-5 flex flex-row justify-center gap-5">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Cancel
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              style={{ backgroundColor: "green" }}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default EditStudentPage;
