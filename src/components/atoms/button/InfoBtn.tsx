import { FC, MouseEventHandler, ReactNode } from "react";

const InfoBtn: FC<{ children: ReactNode; onClick: MouseEventHandler<HTMLButtonElement> }> = ({ children, onClick }) => {
  return (
    <button className="btn btn-info" onClick={onClick}>
      {children}
    </button>
  );
};

export default InfoBtn;
