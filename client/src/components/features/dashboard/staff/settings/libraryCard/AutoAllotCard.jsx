import { CreditCard } from "lucide-react";
import useSetting from "../../../../../../hooks/useSetting";
import Spinner from "../../../../../feedback/spinner/Spinner";
import { fromSnakeCase } from "../../../../../../utils/functions";
import CardHeader from "../../../../../header/CardHeader";
import Select from "../../../../../forms/select/Select";
import CounterField from "../../../../../forms/counter/CounterField";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";

const AutoAllotCard = () => {
  // Fetch the lists of available types
  const { data: cardTypes, loading: cardTypesLoading } = useSetting(
    "LIBRARY-CARD-TYPES",
    []
  );
  const { data: memberTypes, loading: memberTypesLoading } = useSetting(
    "MEMBER-TYPES",
    []
  );

  // This is now the SINGLE SOURCE OF TRUTH for the form's data
  const {
    data,
    setData,
    loading: dataLoading,
    handleSave,
  } = useSetting("LIBRARY-CARD-AUTO-ALLOT-LIMIT", { type: "", limits: {} });

  if (cardTypesLoading || memberTypesLoading || dataLoading) return <Spinner />;

  // Handler to update the selected card type
  const handleTypeChange = (e) => {
    setData((prevData) => ({ ...prevData, type: e.target.value }));
  };

  // Handler to update the limit for a specific member type
  const handleLimitChange = (memberType, count) => {
    setData((prevData) => ({
      ...prevData,
      limits: {
        ...prevData.limits,
        [memberType]: count,
      },
    }));
  };

  return (
    <div className="card p-6 space-y-5">
      <CardHeader
        title="Auto allot cards upon application approval"
        svg={CreditCard}
        svgClass="bg-purple-100 text-purple-600"
      />
      <div className="max-w-xs">
        <Select
          label="Card Type to Allot"
          options={cardTypes}
          // Use the controlled 'value' prop
          value={data.type || ""}
          onChange={handleTypeChange}
          snakeCase
        />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {memberTypes.map((item) => {
          return (
            <CounterField
              key={item}
              label={fromSnakeCase(item, 1)}
              value={data?.limits?.[item] || 0}
              defaultValue={data?.limits?.[item] || 0}
              maxValue={20}
              onChange={(count) => handleLimitChange(item, count)}
            />
          );
        })}
      </div>

      <SaveCancelButton
        // handleSave now correctly uses the up-to-date state from the hook
        onSave={handleSave}
      />
    </div>
  );
};

export default AutoAllotCard;
