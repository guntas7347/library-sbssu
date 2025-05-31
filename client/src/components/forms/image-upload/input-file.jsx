import React, { useRef } from "react";
import { BinSVG } from "../../svg/svg-icons";

const InputFile = ({
  label,
  name = label,
  onChange,
  className = "",
  required = false,
  fileName = "No file chosen",
  accept,
  disabled = false,
  chooseLabel = "Choose file",
  changeLabel = "Change file",
  onDelete = () => {},
}) => {
  const ref = useRef(null);
  const file = !fileName || fileName === "No file chosen";
  return (
    <div className={className}>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && " *"}
      </label>
      <div className="bg-gray-50 border flex gap-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 overflow-hidden focus:border-blue-500  w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <button
          type="button"
          className={
            file
              ? "text-white bg-blue-700 whitespace-nowrap hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-40 cursor-pointer"
              : "text-white bg-yellow-400 whitespace-nowrap hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 me-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-900 disabled:opacity-40 cursor-pointer"
          }
          onClick={() => ref.current?.click()}
          disabled={disabled}
        >
          {file ? chooseLabel : changeLabel}
        </button>
        <span className="flex justify-center items-center truncate">
          {file ? "No file chosen" : fileName}
        </span>{" "}
        {!file && (
          <div className="ml-auto flex justify-center px-1">
            <button type="button" className="cursor-pointer" onClick={onDelete}>
              <BinSVG />
            </button>
          </div>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        name={name}
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
};

export default InputFile;
