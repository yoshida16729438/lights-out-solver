import { FC, MouseEventHandler, ReactNode } from "react";
import "./NavbarItem.css";

const NavbarButtonItem: FC<{ children: ReactNode; onClick: MouseEventHandler<HTMLButtonElement> }> = ({ children, onClick }) => {
  return (
    <button className="nav-link expand" onClick={onClick}>
      {children}
    </button>
  );
};

export default NavbarButtonItem;
