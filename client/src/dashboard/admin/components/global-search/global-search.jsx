import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { searchGlobally } from "../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import { useNavigate } from "react-router-dom";

const ResultBar = ({ path, img, result }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-3 flex gap-5 justify-start items-center cursor-pointer hover:bg-slate-100"
      onClick={() => navigate(`/dashboard/admin${path}`)}
    >
      <i className={`fa-solid fa-${img}`}></i>
      <p>{result}</p>
    </div>
  );
};

const GlobalSearchBar = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange, resetFormFields } = useForm({ search: "" });

  const { search } = formFields;

  const [searchResults, setSearchResults] = useState({});

  const showSearchResults = search !== "";

  useEffect(() => {
    if (showSearchResults) {
      const debounceFunction = setTimeout(async () => {
        await searchGlobally(`search=${search}`)
          .then((res) => setSearchResults(res))
          .catch((err) => setFeedback([1, 2, err]));
      }, 1000);

      return () => clearTimeout(debounceFunction);
    }
  }, [search]);

  return (
    <>
      <div className="relative flex  justify-center items-center">
        <i className="fa-solid fa-magnifying-glass absolute left-2.5"></i>
        <input
          className="pl-8 pr-1 h-8 w-full"
          type="text"
          placeholder="Search..."
          name="search"
          value={search}
          onChange={handleChange}
        />
      </div>
      {showSearchResults && (
        <div
          onClick={() => resetFormFields()}
          className=" bg-gray-300 absolute max-h-80  overflow-hidden z-10 w-96 rounded-xl rounded-t-none"
        >
          {Object.keys(searchResults).map((key, index) => {
            return searchResults[key].map((result) => {
              switch (key) {
                case "members":
                  return (
                    <div key={index}>
                      <ResultBar
                        result={result.fullName}
                        img={"user"}
                        path={`/manage-students/search-students/${result._id}`}
                      />
                    </div>
                  );

                case "books":
                  return (
                    <div key={index}>
                      <ResultBar
                        result={result.title}
                        img={"book"}
                        path={`/manage-books/search-books/${result._id}`}
                      />
                    </div>
                  );

                case "accessions":
                  return (
                    <div key={index}>
                      <ResultBar
                        result={result.bookId.title}
                        img={"book"}
                        path={`/manage-books/search-books/${result.bookId._id}`}
                      />
                    </div>
                  );

                default:
                  return;
              }
            });
          })}

          {}
        </div>
      )}
    </>
  );
};

export default GlobalSearchBar;
