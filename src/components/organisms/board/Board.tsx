import { FC } from "react";
import ColumnHeader from "../../molecules/board/ColumnHeader";
import Row from "../../molecules/board/Row";
import "./Board.css";
import { TurnMode } from "../../../types/TurnMode";

const Board: FC<{ values: number[][]; setValues: (values: number[][]) => void; modulo: number; showValue: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean; turnMode: TurnMode }> = ({ values, setValues, modulo, showValue, showColor, isPreview, enableClick, turnMode }) => {
  const onClickGeneratorGenerator = (rowIndex: number) => {
    return (columnIndex: number) => () => {
      const copyArray = JSON.parse(JSON.stringify(values)) as number[][];

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
        if (0 <= affectedRow && affectedRow < values.length && 0 <= affectedColumn && affectedColumn < values[0].length) {
          copyArray[affectedRow][affectedColumn] = (copyArray[affectedRow][affectedColumn] + 1) % modulo;
        }
      }
      setValues(copyArray);
    };
  };
  return (
    <div className="d-flex flex-row">
      <div className="d-flex flex-column overflow-auto m-1 board text-center">
        <ColumnHeader columnCount={values[0].length} />
        {values.map((rowValues, rowIndex) => {
          return <Row rowNum={rowIndex + 1} values={rowValues} showValue={showValue} showColor={showColor} isPreview={isPreview} enableClick={enableClick} onClickGenerator={onClickGeneratorGenerator(rowIndex)} key={rowIndex} />;
        })}
      </div>
    </div>
  );
};

export default Board;
