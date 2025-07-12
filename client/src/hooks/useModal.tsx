import { useState } from "react";

type ModalState = {
  name: string;
  id?: string | number;
  [key: string]: any;
};

const useModal = <T extends ModalState = ModalState>(
  defaultValue: T = {} as T
) => {
  const [modalState, setModalState] = useState<T>(defaultValue);

  const setModal = (name: string, id?: string | number, extra?: Partial<T>) => {
    setModalState({ ...defaultValue, ...extra, name, id });
  };

  const closeModal = () => {
    setModalState(defaultValue);
  };

  return {
    modal: modalState,
    setModal,
    closeModal,
    isOpen: !!modalState.name,
  };
};

export default useModal;
