import { FC, ReactNode } from "react";
import ModalHeaderText from "../../atoms/modal/ModalHeaderText";

const ModalHeader: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="modal-header">
      <ModalHeaderText>{children}</ModalHeaderText>
    </div>
  );
};

export default ModalHeader;
