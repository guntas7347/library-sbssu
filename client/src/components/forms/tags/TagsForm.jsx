import { Tag } from "lucide-react";
import React, { useEffect, useState } from "react";

const TagsForm = ({ onChange = () => {} }) => {
  const [newTag, setNewTag] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

  const addTag = () => {
    if (newTag.trim() && !tagsArray.includes(newTag.trim())) {
      setTagsArray((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTagsArray((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    onChange(tagsArray);
  }, [tagsArray]);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
          Tags
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {tagsArray.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default TagsForm;
