import { FC } from "react";
import "./CellStyle.css";

const ColumnHeaderCell: FC<{ columnNum: number }> = ({ columnNum }) => {
  return <div className="column-header-cell">{columnNum}</div>;
};

export default ColumnHeaderCell;
