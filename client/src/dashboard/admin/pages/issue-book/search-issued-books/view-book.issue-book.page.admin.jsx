import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import {
  fetchIssuedBook,
  fetchReturnedBook,
} from "../../../hooks/http-requests.hooks.admin";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../../../utils/functions";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const ViewIssuedBookPage = () => {
  const { _id } = useParams();

  const [bookData, setBookData] = useState([]);

  const {
    accessionNumber,
    title,
    author,
    cardNumber,
    issueDate,
    issuedBy,
    rollNumber,
    name,
  } = bookData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchIssuedBook(_id).then((res) => {
        setTimeout(() => {
          setBookData(res);
        }, 2000);
      });
    };
    asyncFunc();
  }, []);

  const isBookFetched = () => {
    if (bookData.length === 0) return false;
    else return true;
  };

  return (
    <div className="m-5">
      <div className="text-center mb-1">
        <h1>Issued Book Details</h1>
      </div>
      {isBookFetched() ? (
        <div>
          <SpanningTable
            rows={[
              ["Accession Number", accessionNumber],
              ["Book Title", title],
              ["Book Author", author],
              ["Card Number", cardNumber],
              ["Issue Date", formatTime(issueDate)],
              ["Issued By", issuedBy],
              ["Student Roll Number", rollNumber],
              ["Student Name", name],
            ]}
          />
        </div>
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
  );
};

export default ViewIssuedBookPage;
