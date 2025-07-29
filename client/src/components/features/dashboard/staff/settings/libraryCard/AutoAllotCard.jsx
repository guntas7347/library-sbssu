import { useState } from "react";
import { useForm } from "../../../../../../hooks/useForm";
import useSetting from "../../../../../../hooks/useSetting";
import { fromSnakeCase } from "../../../../../../utils/functions";
import Spinner from "../../../../../feedback/spinner/Spinner";
import CounterField from "../../../../../forms/counter/CounterField";
import Select from "../../../../../forms/select/Select";
import CardHeader from "../../../../../header/CardHeader";
import { CreditCard } from "lucide-react";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";

const AutoAllotCard = () => {
  const { data: cardTypes, loading } = useSetting("LIBRARY-CARD-TYPES", []);
  const { data: memberTypes, loading: loading1 } = useSetting(
    "MEMBER-TYPES",
    []
  );
  const {
    data,
    loading: loading2,
    handleSave,
  } = useSetting("LIBRARY-CARD-AUTO-ALLOT-LIMIT", []);
  const { formFields, setFields } = useForm();
  const [type, setType] = useState();

  if (loading || loading1 || loading2) return <Spinner />;

  return (
    <div className="card p-6 space-y-5">
      <CardHeader
        title="Auto allot cards upon application approval"
        svg={CreditCard}
        svgClass="bg-purple-100 text-purple-600"
      />
      <div className="max-w-60">
        <Select
          label="Card Type"
          options={cardTypes}
          onChange={(e) => setType(e.target.value)}
          defaultValue={data.type}
          snakeCase
        />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {memberTypes.map((item) => (
          <CounterField
            key={item}
            label={fromSnakeCase(item, 1)}
            onChange={(count) => setFields({ [item]: count })}
            defaultValue={data?.limits?.[item]}
          />
        ))}
      </div>

      <SaveCancelButton
        onSave={() =>
          handleSave({ type, limits: { ...data.limits, ...formFields } })
        }
      />
    </div>
  );
};

export default AutoAllotCard;
