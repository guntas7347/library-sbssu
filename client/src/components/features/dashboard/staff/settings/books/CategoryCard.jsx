import React, { useEffect, useState } from "react";
import CardHeader from "../../../../../header/CardHeader";
import { BookHeadphones, Type } from "lucide-react";
import InputList from "../../../../../forms/input/InputList";
import ListOption from "../../../../../cards/ListOption";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import Spinner from "../../../../../feedback/spinner/Spinner";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";
import { fromSnakeCase, toSnakeCase } from "../../../../../../utils/functions";

const CategoryCard = () => {
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);
  const [array, setArray] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("BOOKS-CATEGORIES");
        if (!res.data) return setLoading(false);
        setArray(res.data.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "BOOKS-CATEGORIES",
        value: array,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  const handleAdd = (field) => {
    const temp = toSnakeCase(field);
    if (array.includes(temp)) return;
    setArray([...array, toSnakeCase(field)]);
  };

  if (loading) return <Spinner />;

  return (
    <div className="card p-6">
      <CardHeader
        title="Book Categories"
        svg={BookHeadphones}
        svgClass="bg-green-100 text-green-600"
      />
      <div className="grid grid-cols-4 mb-4 gap-5">
        <InputList onAdd={handleAdd} />
        {array.map((item, idx) => (
          <ListOption
            key={idx}
            label={fromSnakeCase(item, 1)}
            onDelete={() => {
              const temp = [...array];
              temp.splice(idx, 1);
              setArray(temp);
            }}
          />
        ))}
      </div>
      <SaveCancelButton onSave={handleSave} />
    </div>
  );
};

export default CategoryCard;
