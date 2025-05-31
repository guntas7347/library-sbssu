import React, { useEffect, useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import server from "../../../../hooks/http-requests.hooks.admin";
import Input from "../../../../../../components/forms/input";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import Spinner from "../../../../../../components/feedback/spinner/spinner.component";
import TagsInput from "../../../../../../components/forms/tags-input/tags-input";

const IssueDuration = () => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const [daysArray, setDaysArray] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ISSUE-DURATION");
        setDaysArray(res.p.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
  }, [loading]);

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "ISSUE-DURATION",
        value: daysArray,
      });
      setFeedback(1, res.m);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  if (loading) return <Spinner center={true} height="min-h-96" />;

  return (
    <div>
      <h3 className="text-xl font-semibold">Issue duration (days):-</h3>
      <div>
        <TagsInput
          onChange={(e) => setDaysArray(e.target.value)}
          name="days"
          type="number"
          defaultTags={daysArray}
        />
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

export default IssueDuration;
