import { FC, MouseEventHandler, ReactNode } from "react";

const SecondaryBtn: FC<{ children: ReactNode; onClick: MouseEventHandler<HTMLButtonElement> }> = ({ children, onClick }) => {
  return (
    <button className="btn btn-secondary" onClick={onClick}>
      {children}
    </button>
  );
};

export default SecondaryBtn;
