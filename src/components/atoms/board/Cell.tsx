import { FC } from "react";
import "./CellStyle.css";

const Cell: FC<{ value: number; showValue: boolean; show0Value?: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean; onClick: () => void }> = ({ value, showValue, show0Value = true, showColor, isPreview, enableClick, onClick }) => {
  return (
    <button className={`cell${isPreview ? "-preview" : ""} ${isPreview || !enableClick ? "disable-click" : ""} cell-color-${showColor ? (isPreview ? "preview-" : "") + value : "blank"}`} onClick={onClick}>
      {showValue ? (!show0Value && value === 0 ? "" : value) : ""}
    </button>
  );
};

export default Cell;
