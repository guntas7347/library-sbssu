import React, { useEffect, useState } from "react";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import Spinner from "../../../../../../components/feedback/spinner/Spinner";
import Toggle from "../../../../../../components/buttons/Toggle";
import SaveCancelButton from "../../../../../../components/buttons/SaveCancelButton";

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
        if (!res.data) return setLoading(false);
        setCompatibility(res.p.value);
        setCardCategores(res1.p.value);
        setBookCategories(res2.p.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
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
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };
  return (
    <div>
      <h3 className="text-xl font-semibold">Issue Compatibility:-</h3>
      <div>
        {cardCategores.map((cc, idx) => {
          return (
            <div key={idx}>
              <h2 className="text-xl font-semibold mt-5 mb-2">
                {cc} Card can issue:
              </h2>
              <div className="flex gap-5">
                {bookCategories.map((bc, idx) => {
                  const current = compatibility[cc] || [];
                  const preExist = current.includes(bc);

                  return (
                    <div key={idx} className="flex gap-5">
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
      <SaveCancelButton onSave={handleSave} />
    </div>
  );
};

export default IssueCompatibility;
