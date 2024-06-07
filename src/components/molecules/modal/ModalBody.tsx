import { FC, ReactNode } from "react";

const ModalBody: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

export default ModalBody;
