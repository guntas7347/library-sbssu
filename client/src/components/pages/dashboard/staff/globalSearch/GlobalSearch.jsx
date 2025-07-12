import React, { useEffect, useState } from "react";
// import BookModal from "../../pages/books/view-book.modal";
// import MembersModal from "../../pages/members/member.modal";
import { BinSVG, BookSVG, UserSVG } from "../../../../svg/svgs";
import useFeedback from "../../../../../hooks/useFeedback";
import { useForm } from "../../../../../hooks/useForm";
import server from "../../../../../services/server.api";

const ResultBar = ({ openModal, name, result, id, icon }) => {
  return (
    <div
      className="w-full max-w-xs hover:bg-gray-100 dark:hover:text-blue-400 dark:hover:bg-gray-900 h-10 text-sm truncate whitespace-nowrap overflow-hidden cursor-pointer p-4 rounded-lg flex gap-1 justify-start items-center"
      onClick={() => openModal(name, id)}
    >
      {icon}
      <p className=" truncate w-56">{result}</p>
    </div>
  );
};

const GlobalSearchBar = () => {
  const setFeedback = useFeedback();

  const [modal, setModal] = useState("");
  const [modalValue, setModalValue] = useState("");

  const { formFields, handleChange, resetFormFields } = useForm({ search: "" });

  const { search } = formFields;

  const [searchResults, setSearchResults] = useState({});

  const showSearchResults = search !== "";

  useEffect(() => {
    if (showSearchResults) {
      const debounceFunction = setTimeout(async () => {
        await server(`search=${search}`)
          .then((res) => setSearchResults(res.p))
          .catch((error) => setFeedback(2, error.m));
      }, 1000);

      return () => clearTimeout(debounceFunction);
    } else {
      setSearchResults({});
    }
  }, [search]);

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        {Object.keys(searchResults).length !== 0 && (
          <div className="absolute end-3 inset-y-0  flex items-center ps-3">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                resetFormFields();
                setSearchResults({});
              }}
            >
              <BinSVG />
            </button>
          </div>
        )}
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 pe-9 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          name="search"
          value={search}
          onChange={handleChange}
          autoComplete="off"
        />
        <div
          onClick={() => {
            resetFormFields();
            setSearchResults({});
          }}
          className={`absolute z-1  ${
            showSearchResults ? "flex" : "hidden"
          } w-full flex-col  text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700`}
        >
          {Object.keys(searchResults).map((key, index) => {
            return searchResults[key].map((result) => {
              switch (key) {
                case "members":
                  return (
                    <div key={result.id}>
                      <ResultBar
                        result={result.fullName}
                        id={result.id}
                        icon={<UserSVG />}
                        name="MEMBER"
                        openModal={(modalName, modalValue) => {
                          setModalValue(modalValue);
                          setModal(modalName);
                        }}
                      />
                    </div>
                  );

                case "books":
                  return (
                    <div key={result.id}>
                      <ResultBar
                        result={result.title}
                        id={result.id}
                        icon={<BookSVG />}
                        name="BOOK"
                        openModal={(modalName, modalValue) => {
                          setModalValue(modalValue);
                          setModal(modalName);
                        }}
                      />
                    </div>
                  );

                case "accessions":
                  return (
                    <div key={result.id}>
                      <ResultBar
                        result={result.title}
                        id={result.id}
                        icon={<BookSVG />}
                        name="BOOK"
                        openModal={(modalName, modalValue) => {
                          setModalValue(modalValue);
                          setModal(modalName);
                        }}
                      />
                    </div>
                  );

                default:
                  return;
              }
            });
          })}
        </div>
        {/* {modal === "MEMBER" && (
          <MembersModal
            id={modalValue}
            onClose={() => {
              setModalValue("");
              setModal("");
            }}
          />
        )}{" "}
        {modal === "BOOK" && (
          <BookModal
            id={modalValue}
            onClose={() => {
              setModalValue("");
              setModal("");
            }}
          />
        )} */}
      </div>
    </>
  );
};

export default GlobalSearchBar;
