import React, { useState } from "react";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import Input from "../../../../components/forms/input";
import Select from "../../../../components/forms/select-input";
import SearchInput from "../../../../components/forms/search-input";
import TextArea from "../../../../components/forms/text-area";
import useInput from "../../../../components/hooks/use-input";
import server from "../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../components/context/snackbar.context";

const AddAccessionModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const [accessionNumbers, setAccessionNumbers] = useState("");

  const { formFields, handleChange, setFields } = useForm({
    category: "GENERAL",
  });
  const { formField, handleChange: handleChangeForSearch } = useInput({});

  const [data, setData] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await server.book.addAccessions(formFields);
      setFeedback([1, 1, res]);
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await server.book.fetchForAddAccession(formField.value);
      setData(res);
      setFields("_id", res._id);
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  return (
    <>
      <div>
        <div
          id="default-modal"
          aria-hidden="true"
          className=" flex inset-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Accessions
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 ">
                <form action="submit" onSubmit={handleCreate}>
                  <SearchInput
                    onChange={handleChangeForSearch}
                    label="Any Exisitng Accession Numer"
                    name="accessionNumbers"
                    onSearch={handleSearch}
                    disabled={data.length !== 0}
                  />
                  <div>
                    {data.length !== 0 && (
                      <>
                        <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                          <Input
                            disabled={true}
                            label="Book Title"
                            value={data.title}
                          />
                          <Input
                            disabled={true}
                            label="Book Author"
                            value={data.author}
                          />
                          <TextArea
                            disabled={true}
                            label="Accession Numbers"
                            value={data.accessionNumbers}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {data.length !== 0 && (
                      <>
                        <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
                        <Select
                          onChange={handleChange}
                          label="Accession Category"
                          name="category"
                          options={["GENERAL", "BOOK BANK"]}
                        />
                        <TextArea
                          value={accessionNumbers}
                          onChange={(e) => {
                            let { value } = e.target;
                            value = value.replace(/[^0-9,]/g, "");
                            setAccessionNumbers(value);
                            const acns = value
                              .split(",")
                              .filter((v) => v !== "");
                            setFields("accessionNumbers", acns);
                          }}
                          label="Accession Numbers (comma seperated)"
                          name="accessionNumbers"
                        />
                      </>
                    )}
                  </div>
                  <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
                  <button type="submit" className="c-btn-blue">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAccessionModal;
