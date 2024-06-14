import { FC } from "react";
import "./ColumnHeader.css";
import TopLeftHeaderCell from "../../atoms/board/TopLeftHeaderCell";
import ColumnHeaderCell from "../../atoms/board/ColumnHeaderCell";

const ColumnHeader: FC<{ columnCount: number; isPreview: boolean }> = ({ columnCount, isPreview }) => {
  return (
    <div className="d-flex flex-row sticky-top column-header ms-auto me-auto">
      <TopLeftHeaderCell />
      {[...Array(columnCount)].map((_, index) => (
        <ColumnHeaderCell columnNum={index + 1} key={index + 1} isPreview={isPreview} />
      ))}
    </div>
  );
};

export default ColumnHeader;
