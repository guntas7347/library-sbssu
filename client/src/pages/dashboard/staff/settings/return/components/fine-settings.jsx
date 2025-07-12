import React, { useEffect, useState } from "react";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import server from "../../../../hooks/http-requests.hooks.admin";
import Spinner from "../../../../../../components/feedback/spinner/Spinner";
import ControlButtonCounter from "../../../../../../components/forms/counter/control-button";
import SaveCancelButtons from "../../../../../../components/buttons/save-cancel.buttons";

const FineSettings = () => {
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);

  const { formFields, setFormFields, setFields } = useForm();
  const ControlledCounterField = ({ label, name }) => (
    <ControlButtonCounter
      label={label}
      defaultValue={formFields[name]}
      onChange={(value) => setFields(name, value)}
      message={false}
      minVal={0}
      maxValue={1000}
    />
  );
  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "LATE-FEE-FINE-PER-DAY",
        value: formFields,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("LATE-FEE-FINE-PER-DAY");
        if (!res.data) return setLoading(false);
        setFormFields(res.data.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  if (loading)
    return (
      <div className="min-h-96 flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      {" "}
      <div>
        <div className="">
          <h3 className="text-xl font-semibold">
            Fine (₹) per day for Late Fee:-
          </h3>
          <div className="grid grid-cols-4 gap-x-20 gap-y-7 mt-3">
            <>
              <ControlledCounterField label="UG GENERAL" name="ug_gen" />
              <ControlledCounterField label="UG SC/ST" name="ug_scst" />
              <ControlledCounterField label="UG OTHER" name="ug_other" />

              <div />

              <ControlledCounterField label="PG GENERAL" name="pg_gen" />
              <ControlledCounterField label="PG SC/ST" name="pg_scst" />
              <ControlledCounterField label="PG OTHER" name="pg_other" />

              <div />

              <ControlledCounterField
                label="TEACHER REGULAR"
                name="teacher_regular"
              />
              <ControlledCounterField
                label="TEACHER ADHOC"
                name="teacher_adhoc"
              />
              <ControlledCounterField
                label="NON TEACHING STAFF"
                name="non_teaching_staff"
              />
            </>
          </div>
        </div>

        <SaveCancelButtons onSave={handleSave} />
      </div>
    </div>
  );
};

export default FineSettings;
