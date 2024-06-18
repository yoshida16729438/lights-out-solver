import { BoardData } from "../types/BoardData";
import { TurnMode } from "../types/TurnMode";
import { Matrix } from "./Matrix";

export const solve = (initial: BoardData, final: BoardData, turnMode: TurnMode) => {
  const answers = [] as BoardPushCount[];
  const modulo = initial.getModulo();
  const matrix = new Matrix(initial, final, turnMode);

  //掃き出し法を実行して掃き出せなかったインデックスを保持
  const combinations = new CombinationGenerator(modulo);
  for (let i = 0; i < matrix.len; i++) {
    if (matrix.create1AndMove(i)) matrix.mergeAllTo0(i);
    else combinations.addIndex(i);
  }

  //掃き出せなかったインデックスの右辺が0でないと解けない
  let solvable = true;
  for (let ind of combinations.indexes) {
    if (matrix.equations[ind].rightSideTotal() !== 0) solvable = false;
  }

  if (solvable) {
    do {
      const ans = [] as number[][];
      for (let y = 0; y < matrix.height; y++) {
        const row = [] as number[];
        for (let x = 0; x < matrix.width; x++) {
          const index = y * matrix.width + x;
          if (combinations.indexValueMap.has(index)) row.push(combinations.indexValueMap.get(index)!);
          else {
            const v = combinations.indexes.reduce((currentSum, currentIndex) => currentSum + matrix.equations[index].leftSide[currentIndex] * combinations.indexValueMap.get(currentIndex)!, 0) % modulo;
            row.push((matrix.equations[index].rightSideTotal() + modulo - v) % modulo);
          }
        }
        ans.push(row);
      }
      const pushCount = ans.map((r) => r.reduce((prev, current) => prev + current, 0)).reduce((prev, current) => prev + current, 0);
      answers.push({ board: BoardData.createFromArray(ans, matrix.modulo), pushCount });
    } while (combinations.hasNext());
  }

  //クリック回数でソートして返す
  return answers.sort((a, b) => a.pushCount - b.pushCount).map((v) => v.board);
};

//解答をクリック回数でソートするための型
type BoardPushCount = {
  board: BoardData;
  pushCount: number;
};

//両辺が0になっているセルに適用する値の組み合わせを管理するクラス
class CombinationGenerator {
  public readonly indexValueMap = new Map<number, number>();
  public readonly indexes = [] as number[];

  public constructor(private modulo: number) {}

  public addIndex(index: number) {
    this.indexValueMap.set(index, 0);
    this.indexes.push(index);
  }

  public hasNext() {
    for (let i = this.indexes.length - 1; i >= 0; i--) {
      if (this.indexValueMap.get(this.indexes[i])! + 1 === this.modulo) {
        this.indexValueMap.set(this.indexes[i], 0);
      } else {
        this.indexValueMap.set(this.indexes[i], this.indexValueMap.get(this.indexes[i])! + 1);
        return true;
      }
    }
    return false;
  }
}
