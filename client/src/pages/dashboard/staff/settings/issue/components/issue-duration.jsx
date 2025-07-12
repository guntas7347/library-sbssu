import React, { useEffect, useState } from "react";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import Spinner from "../../../../../../components/feedback/spinner/Spinner";
import SaveCancelButtons from "../../../../../../components/buttons/SaveCancelButton";
import TagsInput from "../../../../../../components/forms/tagsInput/TagsInput";

const IssueDuration = () => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const [daysArray, setDaysArray] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ISSUE-DURATION");

        if (!res.data) return setLoading(false);
        setDaysArray(res.data.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "ISSUE-DURATION",
        value: daysArray,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
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
      <SaveCancelButtons onSave={handleSave} />
    </div>
  );
};

export default IssueDuration;
