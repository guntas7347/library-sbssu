import React from "react";
import Modal from "../../../../components/modals/modal.component";
import Input from "../../../../components/forms/input";
import Select from "../../../../components/forms/select-input";

const FiltersModal = ({ onClose }) => {
  return (
    <Modal title="Filters" onClose={onClose}>
      <div>
        <Select
          label="Status"
          options={["Active", "All", "Cleared"]}
          onChange={() => {}}
        />
      </div>
    </Modal>
  );
};

export default FiltersModal;
