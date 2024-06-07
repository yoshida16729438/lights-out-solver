import { FC, ReactNode } from "react";

const ModalHeaderText: FC<{ children: ReactNode }> = ({ children }) => {
  return <h1 className="modal-title fs-5">{children}</h1>;
};

export default ModalHeaderText;
