import { FC, MouseEventHandler } from "react";
import ModalContainer from "../../molecules/modal/ModalContainer";
import ModalHeader from "../../molecules/modal/ModalHeader";
import ModalBody from "../../molecules/modal/ModalBody";
import ModalFooter1Btn from "../../molecules/modal/ModalFooter1Btn";

const AboutModal: FC<{ onClickClose: MouseEventHandler<HTMLButtonElement> }> = ({ onClickClose }) => {
  return (
    <ModalContainer>
      <>
        <ModalHeader>このサイトについて</ModalHeader>
        <ModalBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cum quibusdam alias consectetur fugit nam repellat vitae obcaecati molestias, iure suscipit quod soluta harum impedit quisquam doloribus aspernatur temporibus repellendus!</ModalBody>
        <ModalFooter1Btn onComplete={onClickClose} completeText="閉じる" />
      </>
    </ModalContainer>
  );
};

export default AboutModal;
