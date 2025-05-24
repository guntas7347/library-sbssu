import { useEffect, useState } from "react";
import { fetchStudentById } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import Modal from "../../../../components/modals/modal.component";
import LoadingModal from "../../../../components/modals/loading-modal";
import { useFeedback } from "../../../../components/context/snackbar.context";
import { UPLOADS_PATH } from "../../../../keys";
import LibraryCardsModal from "./library-cards.modal";

const MembersModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libraryCardsModal, setLibraryCardsModal] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchStudentById(id);
        const libraryCardsString = mergeArrayElementsToString(
          res.libraryCards.map((libraryCard) => {
            return libraryCard.cardNumber;
          })
        );
        setData({ ...res, libraryCards: libraryCardsString });
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
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

  if (loading) return <LoadingModal onClose={onClose} title="Member details" />;

  const imagePath = data.imageUrl
    ? UPLOADS_PATH + data.imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";

  return (
    <>
      {" "}
      <Modal title="Member details" onClose={onClose}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="grid gap-6">
            <Input
              disabled={true}
              label="Name"
              name="fullName"
              value={data.fullName}
            />
            <Input
              disabled={true}
              label="Father's Name"
              name="fatherName"
              value={data.fatherName}
            />

            <Input
              disabled={true}
              label="Membership Id"
              name="membershipId"
              value={data.membershipId}
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              className="border border-black"
              crossOrigin="anonymous"
              src={imagePath}
              alt="image"
            />
          </div>{" "}
          <Input
            disabled={true}
            label="Roll Number"
            name="rollNumber"
            value={data.rollNumber}
          />
          <Input
            disabled={true}
            label="Gender"
            name="gender"
            value={data.gender}
          />
          <Input
            disabled={true}
            label="Date Of Birth"
            name="dob"
            type="date"
            value={data.dob.slice(0, 10)}
          />
          <Input
            disabled={true}
            label="Category"
            name="category"
            value={data.category}
          />
          <Input
            disabled={true}
            label="User Type"
            name="role"
            value={data.role}
          />
          <Input
            disabled={true}
            label="Academic Program"
            name="program"
            value={data.program}
          />{" "}
          <Input
            disabled={true}
            label="Academic Specialization"
            name="specialization"
            value={data.specialization}
          />
          <Input
            disabled={true}
            label="Batch"
            name="batch"
            value={data.batch}
          />
          <Input
            disabled={true}
            label="Email address"
            name="email"
            type="email"
            value={data.email}
          />
          <Input
            disabled={true}
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={data.phoneNumber}
          />
          <Input
            disabled={true}
            label="Created At"
            name="createdAt"
            value={new Date(data.createdAt).toLocaleString()}
          />
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Library Cards
            </label>
            <button
              type="button"
              onClick={() => setLibraryCardsModal(id)}
              className="c-btn-blue"
            >
              View Library Cards
            </button>
          </div>
        </div>
      </Modal>
      {libraryCardsModal !== "" && (
        <LibraryCardsModal
          id={libraryCardsModal}
          onClose={() => setLibraryCardsModal("")}
        />
      )}
    </>
  );
};

export default MembersModal;
