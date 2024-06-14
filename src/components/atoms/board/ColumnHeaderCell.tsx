import { FC } from "react";
import "./CellStyle.css";

const ColumnHeaderCell: FC<{ columnNum: number; isPreview: boolean }> = ({ columnNum, isPreview }) => {
  return <div className={`column-header-cell${isPreview ? "-preview" : ""}`}>{columnNum}</div>;
};

export default ColumnHeaderCell;
