import React, { useEffect, useState } from "react";
import Modal from "../../../../components/modals/modal.component";
import Input from "../../../../components/forms/input";
import LoadingModal from "../../../../components/modals/loading-modal";
import { UPLOADS_PATH } from "../../../../keys";
import { useFeedback } from "../../../../components/context/snackbar.context";
import server from "../../hooks/http-requests.hooks.admin";

const LibraryCardsModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.member.fetchCards(id);
        setData(res.p);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
        onClose();
      }
    })();
  }, []);

  if (loading) return <LoadingModal onClose={onClose} title="Library Cards" />;

  const imagePath = data.imageUrl
    ? UPLOADS_PATH + data.imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";

  return (
    <>
      <Modal title="Library Cards" onClose={onClose}>
        <div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="grid gap-6">
              <Input disabled={true} label="Name" value={data.fullName} />
              <Input
                disabled={true}
                label="Branch | Specialization"
                value={`${data.program} | ${data.specialization}`}
              />
              <Input
                disabled={true}
                label="Roll No | Membership Id"
                value={`${data.rollNumber} | ${data.membershipId}`}
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                className="border border-black"
                crossOrigin="anonymous"
                src={imagePath}
                alt="image"
              />
            </div>
          </div>
          {data.libraryCards.map((lc, idx) => {
            const even = idx % 2 === 0;
            return (
              <div key={lc.cardNumber} className={even && "bg-gray-600"}>
                <hr className="c-hr" />
                <h3 className="mb-1 text-xl font-bold">Card Details</h3>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <Input
                    disabled={true}
                    label="Card Number"
                    value={lc.cardNumber}
                  />
                  <Input
                    disabled={true}
                    label="Card Category"
                    value={lc.category}
                  />
                  <Input
                    disabled={true}
                    label="Current Status"
                    value={lc.status}
                  />
                  <Input
                    disabled={true}
                    label="Created By"
                    value={`${lc.createdBy.fullName} | ${lc.createdBy.idNumber}`}
                  />
                  <Input
                    disabled={true}
                    label="Created At"
                    value={new Date(lc.createdAt).toLocaleString()}
                  />
                  <Input
                    disabled={true}
                    label="Auto Alloted"
                    value={lc.autoAlloted ? "YES" : "NO"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default LibraryCardsModal;
