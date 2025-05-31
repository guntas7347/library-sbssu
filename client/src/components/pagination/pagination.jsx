import React from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams.hook";
import { useForm } from "../forms/use-form-hook/use-form.hook.component";
import { createURLQuery } from "../../utils/functions";

const Pagination = ({ totalPages = 1 }) => {
  const navigate = useNavigate();
  const { queryString, params } = useQueryParams();

  const pageNumber = Number(params.page) || 1;
  const { formFields, handleChange, setFormFields } = useForm({
    pageNumber: params.page ? Number(params.page) : 1,
  });

  const handlePreviousPage = () => {
    setFormFields({ pageNumber: formFields.pageNumber - 1 });
    const q = createURLQuery({ page: formFields.pageNumber - 1 }, queryString);
    navigate(`?${q}`);
  };
  const handleNextPage = () => {
    setFormFields({ pageNumber: formFields.pageNumber + 1 });

    const q = createURLQuery({ page: formFields.pageNumber + 1 }, queryString);
    navigate(`?${q}`);
  };

  const handleJumpPage = () => {
    const q = createURLQuery({ page: formFields.pageNumber }, queryString);
    navigate(`?${q}`);
  };

  return (
    <div className="flex gap-10 justify-center items-center my-2">
      <button
        className="c-btn-blue"
        onClick={handlePreviousPage}
        disabled={pageNumber < 2}
      >
        Prev
      </button>
      <p className="bg-custom-dark-blue p-3 text-white rounded min-w-12 text-center disabled">
        {pageNumber} of {totalPages}
      </p>
      <button
        className="c-btn-blue"
        onClick={handleNextPage}
        disabled={pageNumber >= totalPages}
      >
        Next
      </button>
      <div className="flex gap-5">
        <input
          className="bg-custom-dark-blue p-3 w-32 text-white"
          type="number"
          placeholder="Go To"
          min={1}
          max={totalPages}
          onChange={handleChange}
          name="pageNumber"
          onInput={(e) => {
            e.target.value =
              e.target.value > totalPages ? totalPages : e.target.value;
          }}
        />
        <button className="c-btn-blue" onClick={handleJumpPage}>
          Jump
        </button>
      </div>
    </div>
  );
};

export default Pagination;
