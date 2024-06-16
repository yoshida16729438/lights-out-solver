import { BoardData } from "../types/BoardData";
import { TurnMode } from "../types/TurnMode";
import { Matrix } from "./Matrix";

export const solve = (initial: BoardData, final: BoardData, turnMode: TurnMode) => {
  const answers = [] as BoardData[];

  const matrix = new Matrix(initial, final, turnMode);

  const indexesOf0 = [] as number[];
  for (let i = 0; i < matrix.len; i++) {
    if (matrix.create1AndMove(i)) matrix.mergeAllTo0(i);
    else indexesOf0.push(i);
  }

  let solvable = true;
  for (let ind of indexesOf0) {
    if (matrix.equations[ind].rightSide.reduce((prev, current) => prev + current, 0) % matrix.modulo !== 0) solvable = false;
  }

  if (solvable) {
    const ans = [] as number[][];
    for (let y = 0; y < matrix.height; y++) {
      const row = [] as number[];
      for (let x = 0; x < matrix.width; x++) {
        row.push(matrix.equations[y * matrix.width + x].rightSide.reduce((prev, current) => prev + current, 0) % matrix.modulo);
      }
      ans.push(row);
    }
    answers.push(BoardData.createFromArray(ans, matrix.modulo));
  }
  return answers;
};
