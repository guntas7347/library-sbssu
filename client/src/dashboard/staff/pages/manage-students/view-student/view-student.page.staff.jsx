import { useParams } from "react-router-dom";
import { fetchStudentById } from "../../../hooks/http-requests.hooks.admin";
import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";

const ViewStudentPage = () => {
  const { _id } = useParams();

  const [studentDoc, setStudentDoc] = useState({
    rollNumber: null,
    name: "",
    fathersName: "",
    gender: "",
    dob: "",
    program: "",
    specialization: "",
    batch: "",
    email: "",
    phoneNumber: null,
    libraryCards: [
      { cardNumber: "", status: "" },
      { cardNumber: "", status: "" },
    ],
  });

  const {
    rollNumber,
    name,
    fathersName,
    gender,
    dob,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
    libraryCards,
  } = studentDoc;

  useEffect(() => {
    const asyncFunc = async () => setStudentDoc(await fetchStudentById(_id));
    asyncFunc();
  }, []);

  return (
    <div className="text-center m-5">
      <h1 className="">Student Roll Number : {rollNumber}</h1>

      <div>
        <SpanningTable
          rows={[
            ["Name", name],
            ["Fathers Name", fathersName],
            ["Gender", gender],
            ["Date Of Birth", new Date(dob).toDateString()],
            [
              "Program | Specialization | Batch",
              program +
                " " +
                "|" +
                " " +
                specialization +
                " " +
                "|" +
                " " +
                batch,
            ],
            ["Email", email],
            ["Phone Number", phoneNumber],
            ["Library Card", libraryCards[0].cardNumber],
            ["Library Card", libraryCards[1].cardNumber],
          ]}
        />
      </div>
    </div>
  );
};

export default ViewStudentPage;
