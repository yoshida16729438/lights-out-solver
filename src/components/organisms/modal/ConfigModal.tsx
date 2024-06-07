import { FC, MouseEventHandler } from "react";
import ModalContainer from "../../molecules/modal/ModalContainer";
import ModalHeader from "../../molecules/modal/ModalHeader";
import ModalBody from "../../molecules/modal/ModalBody";
import ModalFooter3Btn from "../../molecules/modal/ModalFooter3Btn";

const ConfigModal: FC<{ onClickComplete: MouseEventHandler<HTMLButtonElement>; onClickCancel: MouseEventHandler<HTMLButtonElement>; onClickReset: MouseEventHandler<HTMLButtonElement> }> = ({ onClickComplete, onClickCancel, onClickReset }) => {
  return (
    <ModalContainer>
      <>
        <ModalHeader>設定</ModalHeader>
        <ModalBody>settings</ModalBody>
        <ModalFooter3Btn completeText="保存" onComplete={onClickComplete} cancelText="取消" onCancel={onClickCancel} otherText="初期化" onOther={onClickReset} />
      </>
    </ModalContainer>
  );
};

export default ConfigModal;
