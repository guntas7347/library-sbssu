import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { fetchBookDetails } from "../../../hooks/http-requests.hooks.admin";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../../../utils/functions";

const ViewBookPage = () => {
  const { accessionNumber } = useParams();

  const [bookData, setBookData] = useState([]);

  const {
    title,
    author,
    placeAndPublishers,
    publicationYear,
    source,
    cost,
    accessionNumbers,
    pages,
    createdAt,
  } = bookData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchBookDetails({ id: accessionNumber }).then((book) => {
        if (book == null) {
          return;
        }
        setBookData({
          ...book,
          accessionNumbers: mergeArrayElementsToString(book.accessionNumbers),
        });
      });
    };
    asyncFunc();
  }, []);

  const mergeArrayElementsToString = (array = []) => {
    let string = "";
    let isFirst = true;
    const numberOfAccessionNumbers = array.length;
    array.forEach((element) => {
      if (isFirst) {
        string += `(${numberOfAccessionNumbers}) ` + element;
        isFirst = false;
      } else {
        string += ", " + element;
      }
    });
    return string;
  };

  return (
    <div className="m-5">
      <div className="text-center mb-1">
        <h1>Book Details</h1>
      </div>
      <div>
        <SpanningTable
          rows={[
            ["Title", title],
            ["Author", author],
            ["Place And Publishers", placeAndPublishers],
            ["Publication Year", publicationYear],
            ["Pages", pages],
            ["Source", source],
            ["Cost", cost],
            ["Accession Numbers", accessionNumbers],
            ["Book added on", formatTime(createdAt)],
          ]}
        />
      </div>
    </div>
  );
};

export default ViewBookPage;
