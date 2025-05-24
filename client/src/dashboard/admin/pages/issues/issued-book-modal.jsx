import React, { useEffect, useState } from "react";
import { fetchIssuedBook } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import LoadingModal from "../../../../components/modals/loading-modal";
import Modal from "../../../../components/modals/modal.component";
import { useFeedback } from "../../../../components/context/snackbar.context";

const IssuedBookModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchIssuedBook(id);
        setBookData(res);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  if (loading)
    return <LoadingModal onClose={onClose} title="Issued book details" />;

  return (
    <Modal onClose={onClose} title="Issued book details">
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
          label="Issue Date"
          name="issueDate"
          value={new Date(bookData.issueDate).toLocaleString()}
        />

        <Input
          disabled={true}
          label="Issued By"
          name="issuedBy"
          value={bookData.issuedBy}
        />
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
      </div>
    </Modal>
  );
};

export default IssuedBookModal;
