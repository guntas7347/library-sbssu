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
    libraryCards: [],
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
    const asyncFunc = async () => {
      const studentDoc = await fetchStudentById(_id);

      const libraryCardsArray = studentDoc.libraryCards.map((libraryCard) => {
        return libraryCard.cardNumber;
      });
      const libraryCardsString = mergeArrayElementsToString(libraryCardsArray);
      setStudentDoc({ ...studentDoc, libraryCards: libraryCardsString });
    };
    asyncFunc();
  }, []);

  const mergeArrayElementsToString = (array = []) => {
    let string = "";
    let isFirst = true;

    if (array.length === 0) {
      return "None";
    }

    array.forEach((element) => {
      if (isFirst) {
        string += element;
        isFirst = false;
      } else {
        string += ", " + element;
      }
    });

    return string;
  };

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
            ["Library Cards", libraryCards],
          ]}
        />
      </div>
    </div>
  );
};

export default ViewStudentPage;
