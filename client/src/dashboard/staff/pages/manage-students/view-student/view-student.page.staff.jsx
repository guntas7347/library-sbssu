import { useParams } from "react-router-dom";
import { fetchStudentById } from "../../../hooks/http-requests.hooks.staff";
import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";
import LinkButton from "../../../../../components/forms/link-button/link-button.component";

const ViewStudentPage = () => {
  const { _id } = useParams();

  const [studentDoc, setStudentDoc] = useState([]);

  const {
    rollNumber,
    fullName,
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
      await fetchStudentById(_id)
        .then((studentDoc) => {
          const libraryCardsString = mergeArrayElementsToString(
            studentDoc.libraryCards.map((libraryCard) => {
              return libraryCard.cardNumber;
            })
          );
          setStudentDoc({ ...studentDoc, libraryCards: libraryCardsString });
        })
        .catch(() => setStudentDoc({ fullName: "Not Found" }));
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

  const isBookFetched = () => {
    if (studentDoc.length === 0) return false;
    else return true;
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Student Roll Number : {rollNumber}
      </h1>
      <div>
        {isBookFetched() ? (
          <SpanningTable
            rows={[
              ["Name", fullName],
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
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "50vh",
            }}
          >
            <Spinner />
          </div>
        )}
      </div>
      <div className="my-5">
        <LinkButton to={`edit-student`} label="Edit Student Details" />
      </div>
    </div>
  );
};

export default ViewStudentPage;
