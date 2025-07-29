import CardHeader from "../../../../../header/CardHeader";
import { IdCard } from "lucide-react";
import { fromSnakeCase, toSnakeCase } from "../../../../../../utils/functions";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";
import ListOption from "../../../../../cards/ListOption";
import InputList from "../../../../../forms/input/InputList";
import Spinner from "../../../../../feedback/spinner/Spinner";
import useSetting from "../../../../../../hooks/useSetting";

const CardTypes = () => {
  const { data, loading, handleSave, setData } = useSetting(
    "LIBRARY-CARD-TYPES",
    []
  );

  const handleAdd = (field) => {
    const temp = toSnakeCase(field);
    if (data.includes(temp)) return;
    setData([...data, toSnakeCase(field)]);
  };

  if (loading) return <Spinner />;

  return (
    <div className="card p-6">
      <CardHeader
        title="Library Card Types"
        svg={IdCard}
        svgClass="bg-purple-100 text-purple-600"
      />
      <div className="grid grid-cols-4 mb-4 gap-5">
        <InputList onAdd={handleAdd} />
        {data.map((item, idx) => (
          <ListOption
            key={idx}
            label={fromSnakeCase(item, 1)}
            onDelete={() => {
              const temp = [...data];
              temp.splice(idx, 1);
              setData(temp);
            }}
          />
        ))}
      </div>
      <SaveCancelButton onSave={handleSave} />
    </div>
  );
};

export default CardTypes;
