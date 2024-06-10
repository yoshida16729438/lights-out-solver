import { FC } from "react";
import "./CellStyle.css";

const Cell: FC<{ value: number; showValue: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean; onClick: () => void }> = ({ value, showValue, showColor, isPreview, enableClick, onClick }) => {
  return (
    <button className={`cell${isPreview || !enableClick ? "-preview" : ""} cell-color-${showColor ? (isPreview ? "preview-" : "") + (value + 1) : "blank"}`} onClick={onClick}>
      {showValue ? value + 1 : ""}
    </button>
  );
};

export default Cell;
