import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "../../../components/forms/use-form-hook/use-form.hook.component";
import Input from "../../../components/forms/input";
import Select from "../../../components/forms/select-input";
import ImageUploader from "../../../components/forms/image-upload/image-uploader";
import { createApplication, getPrograms } from "../../http-requests";
import { useFeedback } from "../../../components/context/snackbar.context";
import Button from "../../../components/buttons/interactive-button";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const setFeedback = useFeedback();
  const navigate = useNavigate();
  const batchYears = useMemo(() => {
    const array = [];
    const currentYear = new Date().getFullYear();
    for (let index = currentYear; index > currentYear - 5; index--)
      array.push(index);
    console.log("b");
    return array;
  }, []);
  const [applying, setApplying] = useState(false);

  const [programsArr, setProgramsArr] = useState([
    { name: "", specialization: [{ name: "" }] },
  ]);

  const { formFields, handleChange, setFields } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formFields.imageUrl === null ||
      !formFields.imageUrl ||
      formFields.imageUrl === ""
    ) {
      alert("Please upload your image.");
      return;
    }
    setApplying(true);
    if (applying) return;
    try {
      const m = await createApplication(formFields);
      setFeedback(1, m.message);
      setTimeout(() => {
        navigate("/join/applied");
      }, 1000);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  const programs = () => {
    const pr = [];
    programsArr.forEach((p) => {
      pr.push(p.name);
    });
    return pr;
  };

  const specializations = () => {
    const sp = [];
    programsArr
      .find((p) => {
        return p.name === formFields.program;
      })
      ?.specialization.forEach((s) => sp.push(s.name));

    return sp;
  };

  useEffect(() => {
    (async () => {
      const p = await getPrograms();
      setProgramsArr(p.payload);
    })();
  }, []);

  useEffect(() => {
    const pr = programs();
    if (pr.length && !formFields.program) {
      handleChange({ target: { name: "program", value: pr[0] } });
    }
  }, [programsArr]);

  useEffect(() => {
    const sp = specializations();
    if (sp.length && !formFields.specialization) {
      handleChange({ target: { name: "specialization", value: sp[0] } });
    }
  }, [formFields.program]);

  const autofillTestData = () => {
    setFields("fullName", "John Doe");
    setFields("fatherName", "Robert Doe");
    setFields("rollNumber", "123456");
    setFields("gender", "MALE");
    setFields("dob", "2000-01-01");
    setFields("category", "GENERAL");
    setFields("role", "STUDENT UG");
    setFields("program", programs()[0]);
    setFields("specialization", specializations()[0]);
    setFields("batch", 2024);
    setFields("email", "john.doe@example.com");
    setFields("phoneNumber", "9876543210");
    setFields("imageUrl", "/profile/0845e89ff353458eabd4bf77c0d8c32d.jpg"); // assume this path is valid for testing
  };

  const showAutoFill = true;

  return (
    <div className="px-1 md:px-20 md:py-2">
      {showAutoFill && (
        <div className="mb-4">
          <button
            type="button"
            onClick={autofillTestData}
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
          >
            Autofill Test Data
          </button>
        </div>
      )}
      <div>
        <h4 className=" my-5 px-2 md:px-0 md:text-4xl text-3xl font-black dark:text-white">
          Apply Library Membership
        </h4>
        <form className="c-box" onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Input
              label="Name"
              name="fullName"
              value={formFields.fullName}
              required={true}
              onChange={handleChange}
            />
            <Input
              label="Father's Name"
              name="fatherName"
              value={formFields.fatherName}
              required={true}
              onChange={handleChange}
            />
            <Input
              label="Roll Number"
              name="rollNumber"
              value={formFields.rollNumber}
              required={true}
              onChange={handleChange}
            />
            <Select
              label="Gender"
              name="gender"
              value={formFields.gender}
              onChange={handleChange}
              options={["MALE", "FEMALE", "OTHER"]}
            />
            <Input
              label="Date Of Birth"
              name="dob"
              value={formFields.dob}
              type="date"
              required={true}
              onChange={handleChange}
            />
            <Select
              label="Category"
              name="category"
              value={formFields.category}
              onChange={handleChange}
              options={["GENERAL", "SC/ST", "OTHER"]}
            />
            <Select
              label="User Type"
              name="role"
              value={formFields.role}
              onChange={handleChange}
              options={[
                "STUDENT UG",
                "STUDENT PG",
                "TEACHER REGULAR",
                "TEACHER ADHOC",
                "NON TEACHING STAFF",
              ]}
            />
            <Select
              label="Academic Program"
              name="program"
              value={formFields.program}
              onChange={handleChange}
              options={programs()}
            />
            <Select
              label="Specialization"
              name="specialization"
              value={formFields.specialization}
              onChange={handleChange}
              options={specializations()}
            />
            <Select
              label="Batch"
              name="batch"
              value={formFields.batch}
              onChange={handleChange}
              options={batchYears}
            />
            <Input
              label="Email address"
              name="email"
              value={formFields.email}
              type="email"
              required={true}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formFields.phoneNumber}
              type="number"
              required={true}
              onChange={handleChange}
            />
            <div>
              <ImageUploader onUpload={(e) => setFields("imageUrl", e.path)} />
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>

          <Button
            label="Submit"
            type="submit"
            spinner={applying}
            passive={false}
          />
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
