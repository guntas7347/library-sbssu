import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { fetchBookDetails } from "../../../hooks/http-requests.hooks.admin";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../../../utils/functions";
import LinkButton from "../../../../../components/forms/link-button/link-button.component";

const ViewBookPage = () => {
  const { _id } = useParams();

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
      await fetchBookDetails(_id)
        .then((book) => {
          setBookData({
            ...book,
            accessionNumbers: createAccessionNumbersString(
              book.accessionNumbers
            ),
          });
        })
        .catch(() => {
          setBookData({ title: "Book not found" });
        });
    };
    asyncFunc();
  }, [_id]);

  const createAccessionNumbersString = (array = []) => {
    let string = "";
    let isFirst = true;
    array.forEach((element) => {
      if (isFirst) {
        string += `(${array.length}) ` + element.accessionNumber;
        isFirst = false;
      } else {
        string += ", " + element.accessionNumber;
      }
    });
    return string;
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Book Details</h1>

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

      <div className="my-5">
        <LinkButton to={`edit-book`} label="Edit Book Details" />
      </div>
    </div>
  );
};

export default ViewBookPage;
