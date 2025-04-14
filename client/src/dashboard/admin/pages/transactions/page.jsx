import React, { useContext, useState } from "react";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import Table from "../../../../components/table/button-table";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import { fetchTransactions } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import TransactionModal from "./modal";
import AddTransactionModal from "./add-transaction.modal";

const TransactionsPage = () => {
  const { setFeedback } = useContext(SnackBarContext);
  const [rowData, setRowData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState(["", ""]);

  const [currentFilter, setCurrentFilter] = useState({});

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });
    await fetchTransactions({ ...currentFilter, ...e })
      .then((res) => {
        setTotalPages(res.totalPages);
        setRowData(
          processData(res.data, [
            "_id",
            "createdAt",
            "fullName",
            "category",
            "amount",
            "transactionType",
            "closingBalance",
          ])
        );
        if (res.length === 0) {
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  return (
    <div>
      <div>
        <div className="px-10">
          <h1 className="text-3xl font-semibold my-5">Transactions</h1>
          <div className="c-box">
            <div class=" flex justify-center items-center ">
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
                <button
                  className="ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => setModal(["Add", ""])}
                >
                  <svg
                    class="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                    />
                  </svg>
                </button>
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
