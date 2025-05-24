import React, { useEffect, useState } from "react";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import Select from "../../../../../../components/forms/select-input";
import server from "../../../../hooks/http-requests.hooks.admin";
import Spinner from "../../../../../../components/feedback/spinner/spinner.component";
import Toggle from "../../../../../../components/forms/toggle";

const IssuePermission = () => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const { formFields, handleChange, setFormFields, setFields } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ISSUE-PERMISSION");
        setFormFields(res.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  const handleToggle = (toggle, name) => {
    setFields(name, toggle);
  };

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "ISSUE-PERMISSION",
        value: formFields,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  if (loading) return <Spinner center={true} height="min-h-96" />;

  return (
    <div>
      <h3 className="text-xl font-semibold">Issue Permission:-</h3>
      <div className="grid grid-cols-3 gap-x-20 gap-y-4 my-5">
        {/* UG GENERAL */}
        <div className="flex gap-1 justify-between">
          <span>UG GENERAL</span>
          <Toggle
            defaultChecked={formFields.ug_gen}
            onChange={(e) => handleToggle(e, "ug_gen")}
          />
        </div>

        {/* UG SC/ST */}
        <div className="flex gap-1 justify-between">
          <span>UG SC/ST</span>
          <Toggle
            defaultChecked={formFields.ug_scst}
            onChange={(e) => handleToggle(e, "ug_scst")}
          />
        </div>

        {/* UG OTHER */}
        <div className="flex gap-1 justify-between">
          <span>UG OTHER</span>
          <Toggle
            defaultChecked={formFields.ug_other}
            onChange={(e) => handleToggle(e, "ug_other")}
          />
        </div>

        {/* PG GENERAL */}
        <div className="flex gap-1 justify-between">
          <span>PG GENERAL</span>
          <Toggle
            defaultChecked={formFields.pg_gen}
            onChange={(e) => handleToggle(e, "pg_gen")}
          />
        </div>

        {/* PG SC/ST */}
        <div className="flex gap-1 justify-between">
          <span>PG SC/ST</span>
          <Toggle
            defaultChecked={formFields.pg_scst}
            onChange={(e) => handleToggle(e, "pg_scst")}
          />
        </div>

        {/* PG OTHER */}
        <div className="flex gap-1 justify-between">
          <span>PG OTHER</span>
          <Toggle
            defaultChecked={formFields.pg_other}
            onChange={(e) => handleToggle(e, "pg_other")}
          />
        </div>

        {/* TEACHER REGULAR */}
        <div className="flex gap-1 justify-between">
          <span>TEACHER REGULAR</span>
          <Toggle
            defaultChecked={formFields.teacher_regular}
            onChange={(e) => handleToggle(e, "teacher_regular")}
          />
        </div>

        {/* TEACHER ADHOC */}
        <div className="flex gap-1 justify-between">
          <span>TEACHER ADHOC</span>
          <Toggle
            defaultChecked={formFields.teacher_adhoc}
            onChange={(e) => handleToggle(e, "teacher_adhoc")}
          />
        </div>

        {/* NON TEACHING STAFF */}
        <div className="flex gap-1 justify-between">
          <span>NON TEACHING STAFF</span>
          <Toggle
            defaultChecked={formFields.non_teaching_staff}
            onChange={(e) => handleToggle(e, "non_teaching_staff")}
          />
        </div>
      </div>

      <div className="mt-auto text-right">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <button type="button" className="c-btn-blue" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default IssuePermission;
