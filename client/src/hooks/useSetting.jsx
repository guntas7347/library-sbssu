import React, { useEffect, useState } from "react";
import server from "../services/server.api";
import useFeedback from "./useFeedback";

const useSetting = (key, defaultData = null) => {
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting(key);
        if (!res.data) return setLoading(false);
        setData(res.data.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  const handleSave = async (e = null) => {
    try {
      const res = await server.settings.updateSetting({
        key,
        value: e || data,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  return { data, setData, loading, setLoading, handleSave };
};

export default useSetting;
