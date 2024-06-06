import { FC, ReactNode } from "react";
import Navbar from "../organisms/Navbar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
