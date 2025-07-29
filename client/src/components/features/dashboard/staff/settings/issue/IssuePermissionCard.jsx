import CardHeader from "../../../../../header/CardHeader";
import { Shield } from "lucide-react";
import SelectToggle from "../../../../../forms/toggle/SelectToggle";
import useSetting from "../../../../../../hooks/useSetting";
import Spinner from "../../../../../feedback/spinner/Spinner";
import { fromSnakeCase } from "../../../../../../utils/functions";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";
import { useForm } from "../../../../../../hooks/useForm";

const IssuePermissionCard = () => {
  const { data, loading } = useSetting("MEMBER-TYPES", []);
  const {
    handleSave,
    loading: loading1,
    data: prevPermissions,
  } = useSetting("ISSUE-PERMISSION");
  const { formFields, setFields } = useForm();

  if (loading || loading1) return <Spinner center />;

  return (
    <>
      <div className="card p-6">
        <CardHeader
          title="Issue Permission"
          svg={Shield}
          svgClass="bg-green-100 text-green-600"
        />
        <div className="grid  lg:grid-cols-4 md:grid-cols-3 gap-3">
          {data.map((item) => (
            <SelectToggle
              key={item}
              label={fromSnakeCase(item, true)}
              onToggle={(e) => setFields({ [item]: e })}
              defaultToggle={prevPermissions?.[item]}
            />
          ))}
        </div>
        <SaveCancelButton
          onSave={() => handleSave({ ...prevPermissions, ...formFields })}
        />
      </div>
    </>
  );
};

export default IssuePermissionCard;
