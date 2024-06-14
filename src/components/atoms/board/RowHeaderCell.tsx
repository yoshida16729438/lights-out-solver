import { FC } from "react";
import "./CellStyle.css";

const RowHeaderCell: FC<{ rowNum: number; isPreview: boolean }> = ({ rowNum, isPreview }) => {
  return <div className={`row-header-cell${isPreview ? "-preview" : ""}`}>{rowNum}</div>;
};

export default RowHeaderCell;
