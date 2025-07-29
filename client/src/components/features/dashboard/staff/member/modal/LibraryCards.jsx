import React, { useEffect, useState } from "react";
import Modal from "../../../../../modals/modal.component";
import { LibraryCardsTitle } from "./ModalTitle";
import LibraryCard from "../cards/LibraryCard";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import LoadingModal from "../../../../../modals/loading-modal";

const LibraryCards = ({ id, onClose = () => {} }) => {
  const setFeedback = useFeedback();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.member.fetchCards(id);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  if (loading)
    return <LoadingModal onClose={onClose} title={() => LibraryCardsTitle()} />;

  return (
    <Modal title={() => LibraryCardsTitle()} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LibraryCard data={data} />
      </div>
    </Modal>
  );
};

export default LibraryCards;
