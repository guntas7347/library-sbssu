import React, { useState } from "react";
import SearchInput from "../../../../components/forms/search-input";
import useInput from "../../../../components/hooks/use-input";
import server from "../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Input from "../../../../components/forms/input";
import Select from "../../../../components/forms/select-input";
import Modal from "../../../../components/modals/modal.component";
import { UPLOADS_PATH } from "../../../../keys";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import ControlButtonCounter from "../../../../components/forms/counter/control-button";
import ConfirmationModal from "../../../../components/modals/confirmation-model";

const AddCardModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(false);
  const [btn, setBtn] = useState(false);

  const { formField, setField } = useInput();
  const { formFields, handleChange, setFields } = useForm({ cardsCount: 1 });

  const handleCreate = async () => {
    setBtn(false);
    try {
      const res = await server.member.allotCard({
        ...formFields,
        _id: data._id,
      });

      setFeedback(1, res);
      onClose();
    } catch (error) {
      setFeedback(2, error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await server.member.fetchForCard(formField.value);
      const res2 = await server.settings.fetchSetting("LIB-CARD-CATEGORIES");
      setCategories(res2.value);
      setData(res);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  const imagePath = data.imageUrl
    ? UPLOADS_PATH + data.imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";

  return (
    <>
      <Modal onClose={onClose} title="Allot library cards">
        <SearchInput
          onChange={(e) => {
            setField(e.target.value.replace(/[^0-9]/g, "").slice(0, 6));
          }}
          label="Membership Id"
          name="membershipId"
          onSearch={handleSearch}
          disabled={data.length !== 0}
          disabledBtn={formField.value.length < 6}
          value={formField.value}
        />
        {data.length !== 0 && (
          <>
            <hr className="c-hr" />
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 my-1">
              <div>
                <Input label="Name" value={data.fullName} disabled={true} />
                <Input
                  label="Roll Number"
                  value={data.rollNumber}
                  disabled={true}
                />
                <Input
                  label="Program"
                  value={data.program + " | " + data.batch}
                  disabled={true}
                />
                <Input
                  label="Type and category"
                  value={data.role + " | " + data.category}
                  disabled={true}
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
            </div>
            <hr className="c-hr" />
            <div className=" grid grid-cols-2 gap-10">
              <Select
                label="Card category"
                name="category"
                options={categories}
                onChange={handleChange}
                value={formFields.category}
              />
              <ControlButtonCounter
                onChange={(e) => {
                  setFields("cardsCount", e);
                }}
                minVal={1}
              />
            </div>
            <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
            <button
              type="button"
              className="c-btn-blue"
              onClick={() => setAlert(true)}
              disabled={btn}
            >
              Create
            </button>
          </>
        )}
      </Modal>
      <ConfirmationModal
        onClose={() => setAlert(false)}
        onYes={handleCreate}
        show={alert}
        title="Are you sure of it to allot library cards?"
      >
        <div className="grid grid-cols-2 text-start mb-5">
          <span>Member name</span>
          <span>{data.fullName}</span>
          <span>Member Cast</span>
          <span>{data.category}</span>
          <span>Cards</span>
          <span>
            {formFields.cardsCount} cards ({formFields.category})
          </span>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default AddCardModal;
