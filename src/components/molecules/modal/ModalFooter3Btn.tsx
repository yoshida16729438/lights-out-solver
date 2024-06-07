import { FC, MouseEventHandler } from "react";
import PrimaryBtn from "../../atoms/button/PrimaryBtn";
import SecondaryBtn from "../../atoms/button/SecondaryBtn";
import InfoBtn from "../../atoms/button/InfoBtn";

const ModalFooter3Btn: FC<{ completeText: string; onComplete: MouseEventHandler<HTMLButtonElement>; cancelText: string; onCancel: MouseEventHandler<HTMLButtonElement>; otherText: string; onOther: MouseEventHandler<HTMLButtonElement> }> = ({ completeText, onComplete, cancelText, onCancel, otherText, onOther }) => {
  return (
    <div className="modal-footer">
      <InfoBtn onClick={onOther}>{otherText}</InfoBtn>
      <PrimaryBtn onClick={onComplete}>{completeText}</PrimaryBtn>
      <SecondaryBtn onClick={onCancel}>{cancelText}</SecondaryBtn>
    </div>
  );
};

export default ModalFooter3Btn;
