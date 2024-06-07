import { useRef, useState } from "react";
import NavbarLogo from "../atoms/navbar/NavbarLogo";
import NavbarToggleBtn from "../atoms/navbar/NavbarToggleBtn";
import NavbarItemContainer from "../molecules/NavbarItemContainer";
import ConfigModal from "./modal/ConfigModal";

const Navbar = () => {
  const [transitioning, setTransitioning] = useState(false);
  const [shown, setShown] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const nav = useRef<HTMLDivElement>(null);

  const onClickToggle = () => {
    const CLASS_NAME_SHOW = "show";
    const CLASS_NAME_COLLAPSE = "collapse";
    const CLASS_NAME_COLLAPSING = "collapsing";

    if (transitioning) return;
    setTransitioning(true);

    let initialHeight: string, finalHeight: string, classesToAdd: string[];

    nav.current!.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

    if (shown) {
      initialHeight = `${nav.current!.getBoundingClientRect().height}px`;
      finalHeight = "";
      classesToAdd = [CLASS_NAME_COLLAPSE];
    } else {
      initialHeight = "0";
      finalHeight = `${nav.current!.scrollHeight}px`;
      classesToAdd = [CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW];
    }

    nav.current!.style.height = initialHeight;
    void nav.current!.offsetHeight;

    nav.current!.classList.add(CLASS_NAME_COLLAPSING);

    const complete = () => {
      setTransitioning(false);
      nav.current!.classList.remove(CLASS_NAME_COLLAPSING);
      nav.current!.classList.add(...classesToAdd);
      nav.current!.style.height = "";
      setShown((prev) => !prev);
    };

    setTimeout(() => {
      complete();
    }, 355);

    nav.current!.style.height = finalHeight;
  };

  const onClickConfig = () => setShowConfig(true);
  const onClickConfigComplete = () => {
    setShowConfig(false);
  };
  const onClickConfigCancel = () => setShowConfig(false);

  const onClick = () => {};
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top" aria-label="navigation">
        <div className="container-fluid">
          <NavbarLogo />
          <NavbarToggleBtn onClick={onClickToggle} />
          <NavbarItemContainer onClickAbout={onClick} onClickConfig={onClickConfig} ref={nav} />
        </div>
      </nav>
      {showConfig && <ConfigModal onClickComplete={onClickConfigComplete} onClickCancel={onClickConfigCancel} onClickReset={onClick} />}
    </>
  );
};

export default Navbar;
