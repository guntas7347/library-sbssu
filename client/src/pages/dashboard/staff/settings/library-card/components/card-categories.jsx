import React, { useEffect, useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import server from "../../../../hooks/http-requests.hooks.admin";
import Input from "../../../../../../components/forms/input";
import Spinner from "../../../../../../components/feedback/spinner/Spinner";
import SaveCancelButtons from "../../../../../../components/buttons/save-cancel.buttons";

const CardCategories = () => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const { formFields, setFields } = useForm({ category: "" });

  const [categories, setCategories] = useState([]);

  const handleAddCategory = (e) => {
    const { value } = e.target;
    if (categories.includes(value)) return;
    setCategories([...categories, value]);
  };

  const handleRemoveCategory = (idx) => {
    const newCategories = [...categories];
    newCategories.splice(idx, 1);
    setCategories(newCategories);
  };

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "LIB-CARD-CATEGORIES",
        value: categories,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("LIB-CARD-CATEGORIES");
        if (!res.data) return setLoading(false);
        setCategories(res.p.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  if (loading)
    return (
      <div className="min-h-96 flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="">
        <h3 className="text-xl font-semibold">
          Manage Library Card Categories:-
        </h3>
        <div className="mt-3 flex gap-10 items-end">
          <Input
            className="w-48"
            label="Library Card Category"
            type="text"
            value={formFields.category}
            name="category"
            onChange={(e) =>
              setFields(
                "category",
                e.target.value.toUpperCase().replace(/[^a-zA-Z-]/g, "")
              )
            }
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory(e)}
          />
          <button
            className="c-btn-blue"
            onClick={() =>
              handleAddCategory({ target: { value: formFields.category } })
            }
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 my-3">
          {categories.map((right, idx) => {
            return (
              <div
                key={idx}
                className="border px-2 py-1 rounded flex justify-between bg-gray-200 dark:bg-gray-500"
              >
                <span className="capitalize">{right}</span>

                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => handleRemoveCategory(idx)}
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <SaveCancelButtons onSave={handleSave} />
    </div>
  );
};

export default CardCategories;
