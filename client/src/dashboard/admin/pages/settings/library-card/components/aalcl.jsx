import React, { useEffect, useState } from "react";
import server from "../../../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import Input from "../../../../../../components/forms/input";
import Spinner from "../../../../../../components/feedback/spinner/spinner.component";

const AALCL = () => {
  const setFeedback = useFeedback();
  const [laoding, setLoading] = useState(true);

  const { formFields, handleChange, setFormFields } = useForm();

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "AALCL",
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
        const res = await server.settings.fetchSetting("AALCL");
        setFormFields(res.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [laoding]);

  if (laoding)
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
          <Input
            label="UG GENERAL"
            type="number"
            value={formFields.ug_gen}
            name="ug_gen"
            onChange={handleChange}
          />
          <Input
            label="UG SC/ST"
            type="number"
            value={formFields.ug_scst}
            name="ug_scst"
            onChange={handleChange}
          />
          <Input
            label="UG OTHER"
            type="number"
            value={formFields.ug_other}
            name="ug_other"
            onChange={handleChange}
          />
          <div />
          <Input
            label="PG GENERAL"
            type="number"
            value={formFields.pg_gen}
            name="pg_gen"
            onChange={handleChange}
          />
          <Input
            label="PG SC/ST"
            type="number"
            value={formFields.pg_scst}
            name="pg_scst"
            onChange={handleChange}
          />
          <Input
            label="PG OTHER"
            type="number"
            value={formFields.pg_other}
            name="pg_other"
            onChange={handleChange}
          />
          <div />
          <Input
            label="TEACHER REGULAR"
            type="number"
            value={formFields.teacher_regular}
            name="teacher_regular"
            onChange={handleChange}
          />
          <Input
            label="TEACHER ADHOC"
            type="number"
            value={formFields.teacher_adhoc}
            name="teacher_adhoc"
            onChange={handleChange}
          />
          <Input
            label="NON TEACHING STAFF"
            type="number"
            value={formFields.non_teaching_staff}
            name="non_teaching_staff"
            onChange={handleChange}
          />{" "}
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
