import { FC, MouseEventHandler, useEffect, useState } from "react";
import { BoardData } from "../../../types/BoardData";
import NumberInput, { NumberInputValue } from "../../atoms/input/NumberInput";
import ColumnHeader from "../../molecules/board/ColumnHeader";
import Row from "../../molecules/board/Row";
import PrimaryBtn from "../../atoms/button/PrimaryBtn";
import "./AnswerBoard.css";

const AnswerBoard: FC<{ answers: BoardData[]; width: number; height: number; realTime: boolean; onClickSolve: MouseEventHandler<HTMLButtonElement>; cannotDispMsg: string }> = ({ answers, width, height, realTime, onClickSolve, cannotDispMsg }) => {
  const [answerNo, setAnswerNo] = useState<NumberInputValue>(1);
  const [isValid, setIsValid] = useState(true);
  const defaultBoardDataArray = [...Array(height)].map((_) => [...Array(width)].map((_) => 0));
  //const [board, setBoard] = useState(BoardData.createFromArray(defaultBoardDataArray, 0));

  const getBoardData = () => {
    if (isValid && typeof answerNo === "number" && answerNo <= answers.length) {
      return answers[answerNo - 1];
    } else {
      return BoardData.createFromArray(defaultBoardDataArray, 2);
    }
  };

  useEffect(() => {
    setAnswerNo(1);
    //eslint-disable-next-line
  }, [answers]);

  const dummyOnClickGenerator = (_: number) => () => {};

  return (
    <>
      <div className="m-0 p-0 row">
        <h1 className="col-auto">解答</h1>
        {!realTime && (
          <div className="col-auto ms-1 mt-1 ps-1">
            <PrimaryBtn onClick={onClickSolve}>解く</PrimaryBtn>
          </div>
        )}
      </div>
      <div className="row m-0 p-0 position-relative">
        <div className="d-flex flex-row">
          <div className="d-flex flex-column overflow-auto m-1 board text-center">
            <ColumnHeader columnCount={getBoardData().width} isPreview={false} />
            {getBoardData().map((rowValues, rowIndex) => {
              return <Row rowNum={rowIndex + 1} values={rowValues} showValue={true} show0Value={false} showColor={false} isPreview={false} enableClick={false} onClickGenerator={dummyOnClickGenerator} key={rowIndex} />;
            })}
          </div>
        </div>
        {answers.length === 0 && <div className="no-answer-msg">{cannotDispMsg}</div>}
      </div>
      <div className="row d-flex flex-row justify-content-center">
        <div className="col-auto m-1 p-1">
          <NumberInput caption={`解答番号${answers.length > 1 ? ` (1~${answers.length})` : ""}`} value={answerNo} setValue={setAnswerNo} isValid={isValid} setIsValid={setIsValid} max={answers.length} min={1} />
        </div>
      </div>
    </>
  );
};

export default AnswerBoard;
