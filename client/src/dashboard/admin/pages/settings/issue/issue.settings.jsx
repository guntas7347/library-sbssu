import React, { useContext, useEffect, useState } from "react";
import Input from "../../../../../components/forms/input";
import Select from "../../../../../components/forms/select-input";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";
import server from "../../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const IssueSettings = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [loadingId, setLoadingId] = useState(true);
  const [loadingIp, setLoadingIp] = useState(true);

  const {
    formFields: issueDuration,
    handleChange: hcid,
    setFormFields: sfid,
  } = useForm({
    ug_gen: 14,
    ug_scst: 14,
    ug_other: 14,
    pg_gen: 14,
    pg_scst: 14,
    pg_other: 14,
    teacher_regular: 14,
    teacher_adhoc: 14,
    non_teaching_staff: 14,
  });
  const {
    formFields: issuePermission,
    handleChange: hcip,
    setFormFields: sfip,
  } = useForm({
    ug_gen: "allow",
    ug_scst: "allow",
    ug_other: "allow",
    pg_gen: "allow",
    pg_scst: "allow",
    pg_other: "allow",
    teacher_regular: "allow",
    teacher_adhoc: "allow",
    non_teaching_staff: "allow",
  });

  const handleSaveID = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "ISSUE-DURATION",
        value: issueDuration,
      });
      setFeedback([1, 1, res]);
      setLoadingId(true);
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  const handleSaveIP = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "ISSUE-PERMISSION",
        value: issuePermission,
      });
      setFeedback([1, 1, res]);
      setLoadingIp(true);
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const res1 = await server.settings.fetchSetting("ISSUE-DURATION");
        const res2 = await server.settings.fetchSetting("ISSUE-PERMISSION");
        sfid(res1.value);
        setLoadingId(false);
        sfip(res2.value);
        setLoadingIp(false);
      } catch (error) {
        setFeedback([1, 2, error]);
      }
    };
    f();
  }, [loadingId, loadingIp]);

  console.log("RENDERED");

  if (loadingId || loadingIp)
    return (
      <div className="min-h-96 flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Issue Settings</h2>
      <div>
        <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
        <h3 className="text-xl font-semibold">Issue duration (days):-</h3>
        <div className="grid grid-cols-4 gap-x-20 gap-y-7 mt-3">
          <Input
            label="UG GENERAL"
            type="number"
            value={issueDuration.ug_gen}
            name="ug_gen"
            onChange={hcid}
          />
          <Input
            label="UG SC/ST"
            type="number"
            value={issueDuration.ug_scst}
            name="ug_scst"
            onChange={hcid}
          />
          <Input
            label="UG OTHER"
            type="number"
            value={issueDuration.ug_other}
            name="ug_other"
            onChange={hcid}
          />
          <div />
          <Input
            label="PG GENERAL"
            type="number"
            value={issueDuration.pg_gen}
            name="pg_gen"
            onChange={hcid}
          />
          <Input
            label="PG SC/ST"
            type="number"
            value={issueDuration.pg_scst}
            name="pg_scst"
            onChange={hcid}
          />
          <Input
            label="PG OTHER"
            type="number"
            value={issueDuration.pg_other}
            name="pg_other"
            onChange={hcid}
          />
          <div />
          <Input
            label="TEACHER REGULAR"
            type="number"
            value={issueDuration.teacher_regular}
            name="teacher_regular"
            onChange={hcid}
          />
          <Input
            label="TEACHER ADHOC"
            type="number"
            value={issueDuration.teacher_adhoc}
            name="teacher_adhoc"
            onChange={hcid}
          />
          <Input
            label="NON TEACHING STAFF"
            type="number"
            value={issueDuration.non_teaching_staff}
            name="non_teaching_staff"
            onChange={hcid}
          />{" "}
        </div>
        <div className="mt-auto text-right">
          <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
          <button type="button" className="c-btn-blue" onClick={handleSaveID}>
            Save
          </button>
        </div>
      </div>
      <div>
        <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
        <h3 className="text-xl font-semibold">Issue Permission:-</h3>
        <div className="grid grid-cols-4 gap-x-20 gap-y-7 mt-3">
          <Select
            label="UG GENERAL"
            options={["allow", "deny"]}
            defaultValue={issuePermission.ug_gen}
            name="ug_gen"
            onChange={hcip}
          />
          <Select
            label="UG SC/ST"
            options={["allow", "deny"]}
            defaultValue={issuePermission.ug_scst}
            name="ug_scst"
            onChange={hcip}
          />
          <Select
            label="UG OTHER"
            options={["allow", "deny"]}
            defaultValue={issuePermission.ug_other}
            name="ug_other"
            onChange={hcip}
          />
          <div />

          <Select
            label="PG GENERAL"
            options={["allow", "deny"]}
            defaultValue={issuePermission.pg_gen}
            name="pg_gen"
            onChange={hcip}
          />
          <Select
            label="PG SC/ST"
            options={["allow", "deny"]}
            defaultValue={issuePermission.pg_scst}
            name="pg_scst"
            onChange={hcip}
          />
          <Select
            label="PG OTHER"
            options={["allow", "deny"]}
            defaultValue={issuePermission.pg_other}
            name="pg_other"
            onChange={hcip}
          />
          <div />

          <Select
            label="TEACHER REGULAR"
            options={["allow", "deny"]}
            defaultValue={issuePermission.teacher_regular}
            name="teacher_regular"
            onChange={hcip}
          />
          <Select
            label="TEACHER ADHOC"
            options={["allow", "deny"]}
            defaultValue={issuePermission.teacher_adhoc}
            name="teacher_adhoc"
            onChange={hcip}
          />
          <Select
            label="NON TEACHING STAFF"
            options={["allow", "deny"]}
            defaultValue={issuePermission.non_teaching_staff}
            name="non_teaching_staff"
            onChange={hcip}
          />
        </div>
        <div className="mt-auto text-right">
          <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
          <button type="button" className="c-btn-blue" onClick={handleSaveIP}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueSettings;
