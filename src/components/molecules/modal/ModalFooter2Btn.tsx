import { FC, MouseEventHandler } from "react";
import PrimaryBtn from "../../atoms/button/PrimaryBtn";
import SecondaryBtn from "../../atoms/button/SecondaryBtn";

const ModalFooter2Btn: FC<{ completeText: string; onComplete: MouseEventHandler<HTMLButtonElement>; cancelText: string; onCancel: MouseEventHandler<HTMLButtonElement> }> = ({ completeText, onComplete, cancelText, onCancel }) => {
  return (
    <div className="modal-footer">
      <PrimaryBtn onClick={onComplete}>{completeText}</PrimaryBtn>
      <SecondaryBtn onClick={onCancel}>{cancelText}</SecondaryBtn>
    </div>
  );
};

export default ModalFooter2Btn;
