import { FC, ReactNode } from "react";
import "./Modal.css";

const ModalContainer: FC<{ children:ReactNode }> = ({ children }) => {
  return (
    <div className="modal overlay d-block">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
