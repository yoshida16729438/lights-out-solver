import { FC, MouseEventHandler } from "react";
import PrimaryBtn from "../../atoms/button/PrimaryBtn";

const ModalFooter1Btn: FC<{ completeText: string; onComplete: MouseEventHandler<HTMLButtonElement> }> = ({ completeText, onComplete }) => {
  return (
    <div className="modal-footer">
      <PrimaryBtn onClick={onComplete}>{completeText}</PrimaryBtn>
    </div>
  );
};

export default ModalFooter1Btn;
