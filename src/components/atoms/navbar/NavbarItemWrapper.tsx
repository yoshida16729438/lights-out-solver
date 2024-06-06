import { FC, ReactElement } from "react";

const NavbarItemWrapper: FC<{ children: ReactElement }> = ({ children }) => {
  return <li className="nav-item">{children}</li>;
};

export default NavbarItemWrapper;
