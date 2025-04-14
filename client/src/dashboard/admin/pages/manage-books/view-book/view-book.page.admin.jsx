import { useEffect, useState } from "react";
import { fetchBookDetails } from "../../../hooks/http-requests.hooks.admin";
import Input from "../../../../../components/forms/input";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import useToggle from "../../../../../components/hooks/use-toggle";

const BookModal = ({ id, onClose }) => {
  const [bookData, setBookData] = useState([]);

  const { formFields, handleChange } = useForm({});
  const { getToggle, toggle } = useToggle(false);

  const {
    title,
    author,
    placeAndPublishers,
    publicationYear,
    source,
    cost,
    accessionNumbers,
    pages,
    createdAt,
  } = bookData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchBookDetails(id)
        .then((book) => {
          setBookData({
            ...book,
            accessionNumbers: createAccessionNumbersString(
              book.accessionNumbers
            ),
          });
        })
        .catch(() => {
          setBookData({ title: "Book not found" });
        });
    };
    asyncFunc();
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

  const disabled = true;

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
                  Book Details
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
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Name"
                    name="title"
                    value={title}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Author"
                    name="author"
                    value={author}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Place and Publishers"
                    name="placeAndPublishers"
                    value={placeAndPublishers}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Publication Year"
                    name="publicationYear"
                    value={publicationYear}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Source"
                    name="source"
                    value={source}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Cost"
                    name="cost"
                    value={cost}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Accession Numbers"
                    name="accessionNumbers"
                    value={accessionNumbers}
                  />{" "}
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Pages"
                    name="pages"
                    value={pages}
                  />{" "}
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Created At"
                    name="createdAt"
                    value={createdAt}
                    type="date"
                  />{" "}
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="ISBN"
                    name="isbn"
                    value={pages}
                  />
                </div>
                <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Mark as Inactive
                  </button>

                  {!getToggle ? (
                    <button
                      type="button"
                      onClick={() => toggle()}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      // onClick={handleEdit}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookModal;
