import { FC } from "react";
import "./CellStyle.css";

const RowHeaderCell: FC<{ rowNum: number }> = ({ rowNum }) => {
  return <div className="row-header-cell">{rowNum}</div>;
};

export default RowHeaderCell;
