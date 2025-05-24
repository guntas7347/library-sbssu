import { useEffect, useState } from "react";
import server, {
  fetchStudentById,
  markInactive,
} from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import Select from "../../../../components/forms/select-input";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Modal from "../../../../components/modals/modal.component";
import LoadingModal from "../../../../components/modals/loading-modal";
import { UPLOADS_PATH } from "../../../../keys";

const EditMemberModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { formFields, handleChange } = useForm();

  useEffect(() => {
    (async () => {
      await fetchStudentById(id)
        .then((studentDoc) => {
          setData(studentDoc);
          setLoading(false);
        })
        .catch(() => {
          setFeedback(2, "Not Found");
        });
    })();
  }, []);

  const handleInactive = async () => {
    await markInactive(id)
      .then((res) => {
        setFeedback(1, res);
        //
      })
      .catch((error) => {
        setFeedback([1, 2, error]);
      });
  };

  const handleUpdate = async () => {
    try {
      //
      const res = await server.member.edit(id, formFields);
      setFeedback(1, res);
      onClose();
    } catch (error) {
      setFeedback(2, error);
    }
  };

  if (loading) return <LoadingModal onClose={onClose} title="Edit Member" />;

  const imagePath = data.imageUrl
    ? UPLOADS_PATH + data.imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";

  return (
    <Modal title="Edit Member" onClose={onClose}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="grid gap-6">
          <Input
            onChange={handleChange}
            label="Name"
            name="fullName"
            defaultValue={data.fullName}
          />
          <Input
            onChange={handleChange}
            label="Father's Name"
            name="fatherName"
            defaultValue={data.fatherName}
          />
          <Input
            onChange={handleChange}
            label="Roll Number"
            name="rollNumber"
            defaultValue={data.rollNumber}
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            className="border border-black"
            crossOrigin="anonymous"
            src={imagePath}
            alt="image"
          />
        </div>
        <Select
          label="Gender"
          name="gender"
          onChange={handleChange}
          defaultValue={data.gender}
          options={["MALE", "FEMALE", "OTHER"]}
        />
        <Input
          onChange={handleChange}
          label="Date Of Birth"
          name="dob"
          type="date"
          defaultValue={data.dob?.slice(0, 10)}
        />
        <Select
          label="Category"
          name="category"
          onChange={handleChange}
          defaultValue={data.category}
          options={["GENERAL", "SC/ST", "OTHER"]}
        />
        <Input
          onChange={handleChange}
          label="User Type"
          name="role"
          defaultValue={data.role}
        />
        <Input
          onChange={handleChange}
          label="Academic Program"
          name="program"
          defaultValue={data.program}
        />
        <Input
          onChange={handleChange}
          label="Batch"
          name="batch"
          defaultValue={data.batch}
        />
        <Input
          onChange={handleChange}
          label="Email address"
          name="email"
          type="email"
          defaultValue={data.email}
        />
        <Input
          onChange={handleChange}
          label="Phone Number"
          name="phoneNumber"
          type="number"
          defaultValue={data.phoneNumber}
        />
      </div>

      <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleInactive}
        >
          Mark as Inactive
        </button>

        <button
          type="button"
          onClick={handleUpdate}
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          disabled={Object.keys(formFields).length === 0}
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditMemberModal;
