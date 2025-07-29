import CardHeader from "../../../../../header/CardHeader";
import { Users2 } from "lucide-react";
import { fromSnakeCase, toSnakeCase } from "../../../../../../utils/functions";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";
import ListOption from "../../../../../cards/ListOption";
import InputList from "../../../../../forms/input/InputList";
import Spinner from "../../../../../feedback/spinner/Spinner";
import useSetting from "../../../../../../hooks/useSetting";

const MemberTypes = () => {
  const { data, loading, handleSave, setData } = useSetting("MEMBER-TYPES", []);

  const handleAdd = (field) => {
    const temp = toSnakeCase(field);
    if (data.includes(temp)) return;
    setData([...data, toSnakeCase(field)]);
  };

  if (loading) return <Spinner center={true} height="min-h-96" />;

  return (
    <div className="card p-6">
      <CardHeader
        title="Member Types"
        svg={Users2}
        svgClass="bg-blue-100 text-blue-600"
      />
      <div className="grid grid-cols-4 mb-4 gap-5">
        <InputList onAdd={handleAdd} />
        {data.map((item, idx) => (
          <ListOption
            key={idx}
            label={fromSnakeCase(item, true)}
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

export default MemberTypes;
