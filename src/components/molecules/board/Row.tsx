import { FC } from "react";
import RowHeaderCell from "../../atoms/board/RowHeaderCell";
import Cell from "../../atoms/board/Cell";

const Row: FC<{ rowNum: number; values: number[]; showValue: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean; onClickGenerator: (columnIndex: number) => () => void }> = ({ rowNum, values, showValue, showColor, isPreview, enableClick, onClickGenerator }) => {
  return (
    <div className="d-flex flex-row ms-auto me-auto">
      <RowHeaderCell rowNum={rowNum} />
      {values.map((value, columnIndex) => {
        return <Cell value={value} showValue={showValue} showColor={showColor} isPreview={isPreview} enableClick={enableClick} onClick={onClickGenerator(columnIndex)} key={columnIndex} />;
      })}
    </div>
  );
};

export default Row;
