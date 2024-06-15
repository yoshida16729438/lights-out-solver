import { FC } from "react";
import ColumnHeader from "../../molecules/board/ColumnHeader";
import Row from "../../molecules/board/Row";
import "./Board.css";
import { TurnMode } from "../../../types/TurnMode";
import { BoardData } from "../../../types/BoardData";

const Board: FC<{ values: BoardData; setValues: (values: BoardData) => void; showValue: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean; turnMode: TurnMode }> = ({ values, setValues, showValue, showColor, isPreview, enableClick, turnMode }) => {
  const onClickGeneratorGenerator = (rowIndex: number) => {
    return (columnIndex: number) => () => {
      const newData = values.createCopy();

      const affected = [
        [0, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ];
      for (let i = 0; i <= turnMode; i++) {
        const affectedRow = rowIndex + affected[i][0];
        const affectedColumn = columnIndex + affected[i][1];
        if (newData.isInRange(affectedRow, affectedColumn)) newData.increment(affectedRow, affectedColumn);
      }
      setValues(newData);
    };
  };
  return (
    <div className="d-flex flex-row">
      <div className="d-flex flex-column overflow-auto m-1 board text-center">
        <ColumnHeader columnCount={values.width} isPreview={isPreview} />
        {values.map((rowValues, rowIndex) => {
          return <Row rowNum={rowIndex + 1} values={rowValues} showValue={showValue} showColor={showColor} isPreview={isPreview} enableClick={enableClick} onClickGenerator={onClickGeneratorGenerator(rowIndex)} key={rowIndex} />;
        })}
      </div>
    </div>
  );
};

export default Board;
