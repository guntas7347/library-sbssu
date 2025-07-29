// import React, { useEffect, useMemo, useState } from "react";
// import { useForm } from "../../../components/forms/use-form-hook/use-form.hook.component";
// import Input from "../../../components/forms/input";
// import Select from "../../../components/forms/select-input";
// import ImageCropper from "../../../components/forms/image-upload/image-cropper";
// import {
//   createApplication,
//   getPrograms,
//   uploadImage,
// } from "../../http-requests";
// import { useFeedback } from "../../../components/context/snackbar.context";
// import Button from "../../../components/buttons/interactive-button";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const setFeedback = useFeedback();
  const navigate = useNavigate();

  const batchYears = useMemo(() => {
    const array = [];
    const currentYear = new Date().getFullYear();
    for (let index = currentYear; index > currentYear - 5; index--)
      array.push(index);
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
      formFields.photo === null ||
      !formFields.photo ||
      formFields.photo === ""
    ) {
      alert("Please upload your image.");
      return;
    }
    setApplying(true);
    if (applying) return;
    try {
      const res = await createApplication(formFields);
      setFeedback(1, res);
      navigate("/join/applied");
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
      try {
        const p = await getPrograms();
        setProgramsArr(p.p);
      } catch (error) {
        console.log(error);
      }
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
    const roles = [
      "STUDENT UG",
      "STUDENT PG",
      "TEACHER REGULAR",
      "TEACHER ADHOC",
      "NON TEACHING STAFF",
    ];

    const categories = ["GENERAL", "SC/ST", "OTHER"];
    const genders = ["MALE", "FEMALE"];

    const maleImages = [
      "074df890f8484e9783104044fe53b6e2",
      "61b0b77cd1c746fd937e5a4fb67773de",
      "0845e89ff353458eabd4bf77c0d8c32d",
    ];

    const femaleImages = [
      "90fe44c4df3f4e318c091964c1d17b45",
      "675f4614c0604921a87a64819d14ae58",
    ];

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const getRandomDOB = () => {
      const start = new Date("1990-01-01").getTime();
      const end = new Date("2005-01-01").getTime();
      const randomTime = start + Math.random() * (end - start);
      return new Date(randomTime).toISOString().split("T")[0]; // YYYY-MM-DD
    };

    const gender = getRandomItem(genders);
    const imagePool = gender === "MALE" ? maleImages : femaleImages;
    const randomProgramIndex = Math.floor(Math.random() * 3);
    const program = programs()[randomProgramIndex] ?? programs()[0];

    const randomSpecializationIndex = Math.floor(Math.random() * 3);
    const specialization =
      specializations()[randomSpecializationIndex] ?? specializations()[0];

    setFields("fullName", `Test User ${Math.floor(Math.random() * 1000)}`);
    setFields("fatherName", `Father ${Math.floor(Math.random() * 1000)}`);
    setFields("rollNumber", `${Math.floor(100000 + Math.random() * 900000)}`);
    setFields("gender", gender);
    setFields("dob", getRandomDOB());
    setFields("category", getRandomItem(categories));
    setFields("role", getRandomItem(roles));
    setFields("program", program);
    setFields("specialization", specialization);
    setFields("batch", 2024);
    setFields("email", "guntas7347@gmail.com");
    setFields(
      "phoneNumber",
      `${Math.floor(9000000000 + Math.random() * 100000000)}`
    );
    setFields("photo", `/profile/${getRandomItem(imagePool)}.jpg`);
  };

  const showAutoFill = true;

  const handleImageUpload = async (formData) => {
    try {
      if (!formData) return setFields("photo", null);

      const res = await uploadImage(formData);
      const data = await res.json();

      if (data.s === "ULD201IMG") {
        setFields("photo", data.p);
        setFeedback(1, data.m);
      } else setFeedback(2, data.m);
    } catch (error) {
      setFeedback(2, error);
    }
  };

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
              label="Permenant Roll Number (optional)"
              name="rollNumber"
              value={formFields.rollNumber}
              onChange={(e) => {
                setFields(
                  "rollNumber",
                  e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                );
              }}
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
              type="text"
              required={true}
              onChange={(e) => {
                setFields(
                  "phoneNumber",
                  e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                );
              }}
            />
            <ImageCropper
              onUpload={(e) => handleImageUpload(e)}
              label="Upload face image"
              faceDetector={true}
            />
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border  cursor-pointer border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium  cursor-pointer text-gray-900 dark:text-gray-300"
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

          <Button label="Submit" type="submit" spinner={applying} />
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
