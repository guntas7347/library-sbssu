import React, { useEffect, useState } from "react";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import Input from "../../../../components/forms/input";
import Select from "../../../../components/forms/select-input";
import SearchInput from "../../../../components/forms/search-input";
import TextArea from "../../../../components/forms/text-area";
import useInput from "../../../../components/hooks/use-input";
import server from "../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Modal from "../../../../components/modals/modal.component";
import ConfirmationModal from "../../../../components/modals/confirmation-model";
import Button from "../../../../components/buttons/interactive-button";

const AddAccessionModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const [accessionNumbers, setAccessionNumbers] = useState("");
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const { formFields, handleChange, setFields } = useForm({
    category: "GENERAL",
  });
  const { formField, handleChange: handleChangeForSearch } = useInput({});

  const [data, setData] = useState([]);

  const [acnCategories, setAcnCategories] = useState([""]);
  const [btn, setBtn] = useState(false);

  const handleCreate = async () => {
    try {
      setBtn(true);
      const res = await server.book.addAccessions(formFields);
      setFeedback(1, res.m);
      onClose();
    } catch (error) {
      setFeedback(2, error.m);
      setBtn(false);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await server.book.fetchForAddAccession(formField.value);
      setData(res.p);
      setFields("_id", res.p._id);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ACN-CATEGORIES");
        setAcnCategories(res.p.value);
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
  }, []); // fetch accession categories

  return (
    <>
      {" "}
      <Modal onClose={onClose} title="Add accession numbers">
        <div className="p-4 md:p-5 ">
          <form
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              if (!formFields.accessionNumbers) return;
              setShowAlertDialog(true);
            }}
          >
            <SearchInput
              onChange={handleChangeForSearch}
              label="Any Exisitng Accession Numer"
              name="accessionNumbers"
              onSearch={handleSearch}
              disabled={data.length !== 0}
            />
            <div>
              {data.length !== 0 && (
                <>
                  <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Input
                      disabled={true}
                      label="Book Title"
                      value={data.title}
                    />
                    <Input
                      disabled={true}
                      label="Book Author"
                      value={data.author}
                    />
                    <TextArea
                      disabled={true}
                      label="Accession Numbers"
                      value={data.accessionNumbers}
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              {data.length !== 0 && (
                <>
                  <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
                  <Select
                    onChange={handleChange}
                    label="Accession Category"
                    name="category"
                    options={acnCategories}
                    value={formFields.category}
                  />
                  <TextArea
                    value={accessionNumbers}
                    onChange={(e) => {
                      let { value } = e.target;
                      value = value.replace(/[^0-9,]/g, "");
                      setAccessionNumbers(value);
                      const acns = value.split(",").filter((v) => v !== "");
                      setFields("accessionNumbers", acns);
                    }}
                    label="Accession Numbers (comma seperated)"
                    name="accessionNumbers"
                  />{" "}
                  <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
                  <Button
                    label="Confirm"
                    spinner={btn}
                    passive={false}
                    disabled={accessionNumbers === ""}
                    type="submit"
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      {showAlertDialog && (
        <ConfirmationModal
          onClose={() => setShowAlertDialog(false)}
          onYes={handleCreate}
          title="Are you sure of it to add following accessions?"
        >
          <div className="grid grid-cols-2 text-start mb-5">
            <span> Book title:</span>
            <span> {data.title} </span>
            <span> Book author:</span>
            <span> {data.author} </span>
            <span> Accession categories:</span>
            <span> {formFields.category} </span>
            <span> Accession numbers:</span>
            <span> {accessionNumbers} </span>
          </div>
        </ConfirmationModal>
      )}
    </>
  );
};

export default AddAccessionModal;
