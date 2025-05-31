import React, { useEffect, useState } from "react";
import server from "../../../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import Input from "../../../../../../components/forms/input";
import Spinner from "../../../../../../components/feedback/spinner/spinner.component";
import ControlButtonCounter from "../../../../../../components/forms/counter/control-button";

const AALCL = () => {
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);

  const { formFields, setFormFields, setFields } = useForm();

  const ControlledCounterField = ({ label, name }) => (
    <ControlButtonCounter
      label={label}
      defaultValue={formFields[name]}
      onChange={(value) => setFields(name, value)}
      message={false}
    />
  );

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "AALCL",
        value: formFields,
      });
      setFeedback(1, res.m);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("AALCL");
        setFormFields(res.p.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
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
      <div className="">
        <h3 className="text-xl font-semibold">
          Auto alloted general library cards limit:-
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

      <div className="mt-auto text-right pt-5">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <button type="button" className="c-btn-blue" onClick={handleSave}>
          Save
        </button>{" "}
      </div>
    </div>
  );
};

export default AALCL;
