import React from "react";
import UnderDevelopment from "../../../../../../components/404/under-development";
import Input from "../../../../../../components/forms/input";
import Toggle from "../../../../../../components/forms/toggle";
import { useState } from "react";
import { useEffect } from "react";
import server from "../../../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import Spinner from "../../../../../../components/feedback/spinner/spinner.component";

const IssueCompatibility = () => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const [cardCategores, setCardCategores] = useState([]);
  const [bookCategories, setBookCategories] = useState([]);

  const [compatibility, setCompatibility] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ISSUE-COMPATIBILITY");
        const res1 = await server.settings.fetchSetting("LIB-CARD-CATEGORIES");
        const res2 = await server.settings.fetchSetting("ACN-CATEGORIES");
        setCompatibility(res.p.value);
        setCardCategores(res1.p.value);
        setBookCategories(res2.p.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
  }, [loading]);

  if (loading) return <Spinner center={true} height="min-h-96" />;

  const handleToggle = (toggle, cardCat, bookCat) => {
    setCompatibility((prev) => {
      const current = prev[cardCat] || [];
      const preExist = current.includes(bookCat);

      if (toggle) {
        if (preExist) return prev;
        const updatedArr = [...current, bookCat];
        return { ...prev, [cardCat]: updatedArr };
      } else {
        if (!preExist) return prev;
        const updatedArr = current.filter((cat) => cat !== bookCat);
        return { ...prev, [cardCat]: updatedArr };
      }
    });
  };

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "ISSUE-COMPATIBILITY",
        value: compatibility,
      });
      setFeedback(1, res.m);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };
  return (
    <div>
      <h3 className="text-xl font-semibold">Issue Compatibility:-</h3>
      <div>
        {cardCategores.map((cc) => {
          return (
            <div>
              <h2 className="text-xl font-semibold mt-5 mb-2">
                {cc} Card can issue:
              </h2>
              <div className="flex gap-5">
                {bookCategories.map((bc) => {
                  const current = compatibility[cc] || [];
                  const preExist = current.includes(bc);

                  return (
                    <div className="flex gap-5">
                      <span>{bc} Book</span>
                      <Toggle
                        defaultChecked={preExist}
                        onChange={(e) => handleToggle(e, cc, bc)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-auto text-right">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <button type="button" className="c-btn-blue" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default IssueCompatibility;
