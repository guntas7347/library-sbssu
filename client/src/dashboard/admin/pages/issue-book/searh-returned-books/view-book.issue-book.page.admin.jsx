import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { fetchReturnedBook } from "../../../hooks/http-requests.hooks.admin";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../../../utils/functions";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const ViewReturnedBookPage = () => {
  const { _id } = useParams();

  const [bookData, setBookData] = useState([]);

  const {
    accessionNumber,
    title,
    author,
    cardNumber,
    issueDate,
    issuedBy,
    returnDate,
    returnedBy,
    rollNumber,
    name,
    fine,
  } = bookData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchReturnedBook(_id).then((res) => {
        setBookData(res);
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
        <h1>Returned Book Details</h1>
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
              ["Return Date", formatTime(returnDate)],
              ["Returned By", returnedBy],
              ["Student Roll Number", rollNumber],
              ["Student Name", name],
              ["Fine", "₹" + fine],
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

export default ViewReturnedBookPage;
