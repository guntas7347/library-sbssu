import React from "react";
import CardHeader from "../../../../../header/CardHeader";
import { DollarSign, Minus, Plus } from "lucide-react";
import CounterField from "../../../../../forms/counter/CounterField";
import useSetting from "../../../../../../hooks/useSetting";
import { fromSnakeCase } from "../../../../../../utils/functions";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";
import { useForm } from "../../../../../../hooks/useForm";
import Spinner from "../../../../../feedback/spinner/Spinner";

const FineCard = () => {
  const { data, loading } = useSetting("MEMBER-TYPES", []);
  const {
    handleSave,
    loading: loading1,
    data: fineData,
  } = useSetting("FINE-PER-DAY");
  const { formFields, setFields } = useForm();

  if (loading || loading1) return <Spinner center />;

  return (
    <div className="card p-6">
      <CardHeader
        title="Overdue Fine (per day)"
        svg={DollarSign}
        svgClass="bg-purple-100 text-purple-600"
      />
      <div className="grid md:grid-cols-3 gap-5">
        {data.map((item) => (
          <CounterField
            key={item}
            label={fromSnakeCase(item, true)}
            onChange={(count) => setFields({ [item]: count })}
            defaultValue={fineData?.[item]}
          />
        ))}
      </div>
      <SaveCancelButton
        onSave={() => handleSave({ ...fineData, ...formFields })}
      />
    </div>
  );
};

export default FineCard;
