import { FC, MouseEventHandler } from "react";

const CloseBtn: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
  return <button className="btn-close" onClick={onClick}></button>;
};

export default CloseBtn;
