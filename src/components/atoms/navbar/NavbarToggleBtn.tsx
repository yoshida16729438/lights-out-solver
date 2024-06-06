import { FC, MouseEventHandler } from "react";

const NavbarToggleBtn: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
  return (
    <button className="navbar-toggler collapsed" aria-label="Toggle navigation" onClick={onClick}>
      <span className="navbar-toggler-icon" />
    </button>
  );
};

export default NavbarToggleBtn;
