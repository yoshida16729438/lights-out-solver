import { FC } from "react";
import RowHeaderCell from "../../atoms/board/RowHeaderCell";
import Cell from "../../atoms/board/Cell";

const Row: FC<{ rowNum: number; values: number[]; showValue: boolean; show0Value?: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean; onClickGenerator: (columnIndex: number) => () => void }> = ({ rowNum, values, showValue, show0Value = true, showColor, isPreview, enableClick, onClickGenerator }) => {
  return (
    <div className="d-flex flex-row ms-auto me-auto">
      <RowHeaderCell rowNum={rowNum} isPreview={isPreview} />
      {values.map((value, columnIndex) => {
        return <Cell value={value} showValue={showValue} show0Value={show0Value} showColor={showColor} isPreview={isPreview} enableClick={enableClick} onClick={onClickGenerator(columnIndex)} key={columnIndex} />;
      })}
    </div>
  );
};

export default Row;
