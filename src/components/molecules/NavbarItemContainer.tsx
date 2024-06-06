import { MouseEventHandler, forwardRef } from "react";
import NavbarItemWrapper from "../atoms/navbar/NavbarItemWrapper";
import NavbarButtonItem from "../atoms/navbar/NavbarButtonItem";

const NavbarItemContainer = forwardRef<HTMLDivElement, { onClickAbout: MouseEventHandler<HTMLButtonElement>; onClickConfig: MouseEventHandler<HTMLButtonElement> }>(({ onClickAbout, onClickConfig }, ref) => {
  return (
    <div className="collapse navbar-collapse" ref={ref}>
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <NavbarItemWrapper>
          <NavbarButtonItem onClick={onClickAbout}>このサイトについて</NavbarButtonItem>
        </NavbarItemWrapper>
        <NavbarItemWrapper>
          <NavbarButtonItem onClick={onClickConfig}>設定</NavbarButtonItem>
        </NavbarItemWrapper>
      </ul>
    </div>
  );
});

export default NavbarItemContainer;
