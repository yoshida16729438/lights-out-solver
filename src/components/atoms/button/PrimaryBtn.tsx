import { FC, MouseEventHandler, ReactNode } from "react";

const PrimaryBtn: FC<{ children: ReactNode; onClick: MouseEventHandler<HTMLButtonElement> }> = ({ children, onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryBtn;
