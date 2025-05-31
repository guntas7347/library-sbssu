import React, { useState } from "react";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import Table from "../../../../components/table/button-table";
import { useFeedback } from "../../../../components/context/snackbar.context";
import { fetchTransactions } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import TransactionModal from "./modal";
import AddTransactionModal from "./add-transaction.modal";
import AddButtonSVG from "../../../../components/buttons/svg-buttons/add-svg.button";

const TransactionsPage = () => {
  const setFeedback = useFeedback();
  const [rowData, setRowData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState(["", ""]);

  const [currentFilter, setCurrentFilter] = useState({});

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });
    try {
      const res = await fetchTransactions({ ...currentFilter, ...e });
      setTotalPages(res.p.totalPages);
      setRowData(
        processData(res.p.data, [
          "_id",
          "createdAt",
          "fullName",
          "category",
          "amount",
          "transactionType",
          "closingBalance",
        ])
      );
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  return (
    <div>
      <div>
        <div className="px-10">
          <h1 className="text-3xl font-semibold my-5">Transactions</h1>
          <div className="c-box">
            <div class="flex justify-center items-center ">
              <div className="basis-1/3" />
              <div className="basis-1/3">
                <SearchBarMenu
                  onSearch={(e) => {
                    handleFetch(e);
                  }}
                  menuOptions={["Membership Id"]}
                />
              </div>
              <div className="basis-1/3 flex">
                <AddButtonSVG onClick={() => setModal(["Add", ""])} />
              </div>
            </div>

            <div className="my-5">
              <Table
                cols={[
                  "Date",
                  "Name",
                  "Category",
                  "Amount",
                  "Transaction Type",
                  "Closing Balance",
                  "Action",
                ]}
                rows={rowData}
                onClick={(a, e) => setModal([a, e])}
                actions={["View"]}
                totalPages={totalPages}
                currentPage={currentPage}
                setPage={(e) => {
                  setCurrentPage(e);
                  handleFetch({ page: e });
                }}
              />
            </div>
          </div>
          {modal[0] === "View" && (
            <TransactionModal
              id={modal[1]}
              onClose={() => setModal(["", ""])}
            />
          )}
          {modal[0] === "Add" && (
            <AddTransactionModal
              id={modal[1]}
              onClose={() => setModal(["", ""])}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
