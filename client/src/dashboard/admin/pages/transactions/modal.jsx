import React, { useEffect, useState } from "react";
import Input from "../../../../components/forms/input";
import { fetchTransaction } from "../../hooks/http-requests.hooks.admin";
import ReturnedBookModal from "../returns/returned-book.modal";
import Modal from "../../../../components/modals/modal.component";
import LoadingModal from "../../../../components/modals/loading-modal";
import { useFeedback } from "../../../../components/context/snackbar.context";

const TransactionModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [data, setData] = useState([]);
  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchTransaction(id);
        setData(res);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  if (loading)
    return <LoadingModal onClose={onClose} title="Transaction details" />;

  return (
    <>
      <Modal onClose={onClose} title="Transaction details">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            disabled={true}
            label="Name"
            name="fullName"
            value={data.fullName}
          />
          <Input
            disabled={true}
            label="Membership Id"
            name="membershipId"
            value={data.membershipId}
          />
          <Input
            disabled={true}
            label="Amount"
            name="amount"
            value={data.amount}
          />
          <Input
            disabled={true}
            label="Transaction Type"
            name="transactionType"
            value={data.transactionType}
          />
          <Input
            disabled={true}
            label="Category"
            name="category"
            value={data.category}
          />
          <Input
            disabled={true}
            label="Remark"
            name="remark"
            value={data.remark}
          />
          <Input
            disabled={true}
            label="Payment Method"
            name="paymentMethod"
            value={data.paymentMethod}
          />
          <Input
            disabled={true}
            label="Receipt Number"
            name="receiptNumber"
            value={data.receiptNumber}
          />
          <Input
            disabled={true}
            label="Closing Balance"
            name="closingBalance"
            value={data.closingBalance}
          />
          <Input
            disabled={true}
            label="Date"
            name="createdAt"
            value={new Date(data.createdAt).toLocaleString()}
          />
          {data.returnedBookId && (
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Returned Book Details
              </label>
              <button
                type="button"
                onClick={() => setModal(data.returnedBookId)}
                className="c-btn-blue"
              >
                Open Book Details
              </button>
            </div>
          )}
        </div>
      </Modal>
      {modal !== "" ? (
        <ReturnedBookModal id={modal} onClose={() => setModal("")} />
      ) : (
        <div />
      )}
    </>
  );
};

export default TransactionModal;
