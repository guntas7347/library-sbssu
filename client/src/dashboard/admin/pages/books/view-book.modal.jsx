import { useEffect, useState } from "react";
import { fetchBookDetails } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import Modal from "../../../../components/modals/modal.component";
import LoadingModal from "../../../../components/modals/loading-modal";
import { useFeedback } from "../../../../components/context/snackbar.context";

const BookModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchBookDetails(id);
        setBookData({
          ...res.p,
          accessionNumbers: createAccessionNumbersString(
            res.p.accessionNumbers
          ),
        });
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
        onClose();
      }
    })();
  }, [id]);

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

  if (loading) return <LoadingModal onClose={onClose} title="Book details" />;

  return (
    <Modal onClose={onClose} title="Book details">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Input disabled={true} label="Name" defaultValue={bookData.title} />
        <Input disabled={true} label="Author" defaultValue={bookData.author} />
        <Input
          disabled={true}
          label="Place and Publishers"
          defaultValue={bookData.placeAndPublishers}
        />
        <Input
          disabled={true}
          label="Publication Year"
          defaultValue={bookData.publicationYear}
        />
        <Input disabled={true} label="Source" defaultValue={bookData.source} />
        <Input disabled={true} label="Cost" defaultValue={bookData.cost} />
        <Input
          disabled={true}
          label="Accession Numbers"
          defaultValue={bookData.accessionNumbers}
        />
        <Input disabled={true} label="Pages" defaultValue={bookData.pages} />
        <Input
          disabled={true}
          label="Created At"
          defaultValue={new Date(bookData.createdAt).toLocaleString()}
        />
        <Input disabled={true} label="ISBN" defaultValue={bookData.isbn} />
      </div>
    </Modal>
  );
};

export default BookModal;
