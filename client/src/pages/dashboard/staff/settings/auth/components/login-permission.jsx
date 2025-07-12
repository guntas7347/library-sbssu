import React, { useEffect, useState } from "react";
import Toggle from "../../../../../../components/forms/toggle";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import Spinner from "../../../../../../components/feedback/spinner/Spinner";
import { useFeedback } from "../../../../../../components/context/snackbar.context";
import server from "../../../../hooks/http-requests.hooks.admin";
import SaveCancelButtons from "../../../../../../components/buttons/save-cancel.buttons";

const LoginPermission = () => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const { formFields, setFormFields, setFields } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("LOGIN-PERMISSION");
        if (!res.data) return setLoading(false);
        setFormFields(res.data.value);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  if (loading) return <Spinner center={true} height="min-h-96" />;

  const handleSave = async () => {
    try {
      const res = await server.settings.updateSetting({
        key: "LOGIN-PERMISSION",
        value: formFields,
      });
      setFeedback(1, res);
      setLoading(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Login Permission:-</h3>
      <div className="flex gap-10 my-5">
        <div className="flex gap-1 justify-between">
          <span>Admin (Locked)</span>
          <Toggle defaultChecked={true} disabled={true} />
        </div>
        <div className="flex gap-1 justify-between">
          <span>Staff</span>
          <Toggle
            defaultChecked={formFields.staff}
            onChange={(e) => setFields("staff", e)}
          />
        </div>
        <div className="flex gap-1 justify-between">
          <span>Members</span>
          <Toggle
            defaultChecked={formFields.members}
            onChange={(e) => setFields("members", e)}
          />
        </div>
      </div>
      <SaveCancelButtons onSave={handleSave} />
    </div>
  );
};

export default LoginPermission;
