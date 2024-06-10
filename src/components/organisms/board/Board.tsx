import { FC } from "react";
import ColumnHeader from "../../molecules/board/ColumnHeader";
import Row from "../../molecules/board/Row";
import "./Board.css";

const Board: FC<{ values: number[][]; setValues: (values: number[][]) => void; modulo: number; showValue: boolean; showColor: boolean; isPreview: boolean; enableClick: boolean }> = ({ values, setValues, modulo, showValue, showColor, isPreview, enableClick }) => {
  const onClickGeneratorGenerator = (rowIndex: number) => {
    return (columnIndex: number) => () => {
      const copyArray = JSON.parse(JSON.stringify(values)) as number[][];
      copyArray[rowIndex][columnIndex] = (copyArray[rowIndex][columnIndex] + 1) % modulo;
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
