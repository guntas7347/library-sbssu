import React, { useState, useEffect } from "react";
import { useForm } from "../../../hooks/useForm";

const TagsInput = ({
  label,
  name = "tags",
  defaultTags = [],
  type,
  onChange,
}) => {
  const [tags, setTags] = useState(defaultTags);
  const { formFields, setFields } = useForm();

  // Initialize tag field
  useEffect(() => {
    if (!formFields.tag) {
      setFields({ tag: "" });
    }
  }, []);

  useEffect(() => {
    onChange({ target: { name, value: tags } });
  }, [tags]);

  const handleAddTags = (e) => {
    e.preventDefault();
    const { value } = e.target;

    const trimmedValue = value.trim();
    if (!trimmedValue || tags.includes(trimmedValue)) return;

    setTags([...tags, trimmedValue]);
    setFields({ tag: "" });
  };

  const handleRemoveTags = (idx) => {
    const newTags = [...tags];
    newTags.splice(idx, 1);
    setTags(newTags);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold mb-1">{label}</label>
      <div className="flex gap-2 items-center flex-wrap border w-96 rounded p-2">
        <input
          className="flex-grow border-none outline-none w-full text-2xl mb-5"
          type="text"
          value={formFields.tag || ""}
          name="tag"
          placeholder="Type and press Enter"
          autoComplete="off"
          onChange={(e) => {
            const value = e.target.value;

            if (type === "number") {
              if (/^\d*$/.test(value)) {
                setFields({ tag: value });
              }
              return;
            }

            setFields({ tag: value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTags(e);
            }
          }}
        />
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 min-w-1/6 text-blue-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >
            {tag}
            <button
              type="button"
              className="text-blue-100 hover:text-blue-700 ml-1"
              onClick={() => handleRemoveTags(i)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
