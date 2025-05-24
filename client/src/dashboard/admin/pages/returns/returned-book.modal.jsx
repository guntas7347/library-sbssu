import { useEffect, useState } from "react";
import { fetchReturnedBook } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Modal from "../../../../components/modals/modal.component";
import LoadingModal from "../../../../components/modals/loading-modal";

const ReturnedBookModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchReturnedBook(id);
        setBookData(res);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  if (loading)
    return <LoadingModal onClose={onClose} title="Returned book details" />;

  const customIssued = bookData.issueDate?.slice(11, 19) === "00:00:00";
  const customReturned = bookData.returnDate?.slice(11, 19) === "00:00:00";

  return (
    <Modal onClose={onClose} title="Returned book details">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Input
          disabled={true}
          label="Book Title"
          name="title"
          value={bookData.title}
        />
        <Input
          disabled={true}
          label="Author"
          name="author"
          value={bookData.author}
        />
        <Input
          disabled={true}
          label="Accession Number"
          name="accessionNumber"
          value={bookData.accessionNumber}
        />
        <Input
          disabled={true}
          label="Card Number"
          name="cardNumber"
          value={bookData.cardNumber}
        />
        <Input
          disabled={true}
          label={customIssued ? "Issue Date (Custom Issued)" : "Issue Date"}
          name="issueDate"
          value={new Date(bookData.issueDate).toLocaleString()}
        />{" "}
        <Input
          disabled={true}
          label={
            customReturned
              ? "Return Date (Custom Returned)"
              : "Return Date Date"
          }
          name="returnDate"
          value={new Date(bookData.returnDate).toLocaleString()}
        />
        <Input
          disabled={true}
          label="Issued By"
          name="issuedBy"
          value={bookData.issuedBy}
        />
        <Input
          disabled={true}
          label="Returned By"
          name="returnedBy"
          value={bookData.returnedBy}
        />{" "}
        <Input disabled={true} label="Fine" name="fine" value={bookData.fine} />
        <Input
          disabled={true}
          label="Member Name"
          name="fullName"
          value={bookData.fullName}
        />
        <Input
          disabled={true}
          label="Member Roll No"
          name="rollNumber"
          value={bookData.rollNumber}
        />
        <Input
          disabled={true}
          label="Membership Id"
          name="membershipId"
          value={bookData.rollNumber}
        />
      </div>
    </Modal>
  );
};

export default ReturnedBookModal;
