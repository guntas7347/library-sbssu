import { Clock } from "lucide-react";
import ListOption from "../../../../../cards/ListOption";
import InputList from "../../../../../forms/input/InputList";
import Spinner from "../../../../../feedback/spinner/Spinner";
import CardHeader from "../../../../../header/CardHeader";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";
import useSetting from "../../../../../../hooks/useSetting";

const IssueDurationCard = () => {
  const { data, loading, handleSave, setData } = useSetting(
    "ISSUE-DURATION",
    []
  );
  if (loading) return <Spinner solo />;

  return (
    <>
      <div className="card p-6">
        <CardHeader
          title="Issue Duration Options"
          svg={Clock}
          svgClass="bg-blue-100 text-blue-600"
        />

        <div className="grid lg:grid-cols-6 md:grid-cols-5 mb-4 gap-5">
          <InputList onAdd={(day) => setData([...data, day])} />
          {data.map((day, idx) => (
            <ListOption
              key={idx}
              label={day + " days"}
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
    </>
  );
};

export default IssueDurationCard;
