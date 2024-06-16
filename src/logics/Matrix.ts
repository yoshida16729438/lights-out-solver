import { BoardData } from "../types/BoardData";
import { TurnMode } from "../types/TurnMode";

export class Matrix {
  public equations = [] as Equation[];
  public readonly height: number;
  public readonly width: number;
  public readonly len: number;
  public readonly modulo: number;

  public constructor(initial: BoardData, final: BoardData, turnMode: TurnMode) {
    this.height = initial.height;
    this.width = initial.width;
    this.len = initial.height * initial.width;
    this.modulo = initial.getModulo();
    const dependencyArray = this.createDependencyArray(turnMode);
    const diffArrays = this.calcDiffs(initial, final);
    for (let i = 0; i < this.len; i++) {
      this.equations.push(new Equation(dependencyArray[i], diffArrays[i], this.modulo));
    }
  }

  /**
   * 押下時に反応する範囲を示す配列を作成する
   * @param turnMode 影響範囲
   * @returns 押下時に反応する範囲を示す配列
   */
  private createDependencyArray(turnMode: TurnMode) {
    const dependencyArray = [] as number[][];

    const isInRange = (y: number, x: number) => {
      return 0 <= y && y < this.height && 0 <= x && x < this.width;
    };
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

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const deps = [...Array(this.len)].map((_) => 0);
        for (let i = 0; i <= turnMode; i++) {
          const affectedY = y + affected[i][0];
          const affectedX = x + affected[i][1];
          if (isInRange(affectedY, affectedX)) deps[this.calcIndex(affectedY, affectedX)] = 1;
        }
        dependencyArray.push(deps);
      }
    }

    return dependencyArray;
  }

  private calcIndex(y: number, x: number) {
    return y * this.width + x;
  }

  /**
   * 初期状態と最終状態の差分を計算する
   * @param initial 初期状態
   * @param final 最終状態
   * @returns 初期状態と最終状態の差分を示す配列
   */
  private calcDiffs(initial: BoardData, final: BoardData) {
    const diffs = [] as number[][];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const diff = [...Array(this.len)].map((_) => 0);
        diff[this.calcIndex(y, x)] = (final.getValue(y, x) - initial.getValue(y, x) + this.modulo) % this.modulo;
        diffs.push(diff);
      }
    }
    return diffs;
  }

  /**
   * 位置を入れ替える
   * @param index1 置換対象位置1
   * @param index2 置換対象位置2
   */
  private swap(index1: number, index2: number) {
    const equ1 = this.equations[index1];
    this.equations[index1] = this.equations[index2];
    this.equations[index2] = equ1;
  }

  /**
   * 指定位置の係数を1にする
   * @param index 係数が1になるセル番号
   * @returns 係数を1にできたかどうか
   */
  public create1AndMove(index: number) {
    for (let i = index; i < this.len; i++) {
      if (this.equations[i].leftSide[index] !== 0) {
        this.equations[i].fermatTo1(index);
        if (i !== index) this.swap(i, index);
        return true;
      }
    }
    return false;
  }

  /**
   * 指定位置以外を全て0にする（掃き出し法）
   * @param index 0にする位置
   */
  public mergeAllTo0(index: number) {
    for (let i = 0; i < this.len; i++) {
      if (i === index) continue;

      this.equations[i].mergeTo0(this.equations[index], index);
    }
  }
}

class Equation {
  public constructor(public leftSide: number[], public rightSide: number[], private modulo: number) {}

  public mergeTo0(mergeEqu: Equation, index: number) {
    const div = this.leftSide[index] / mergeEqu.leftSide[index];
    for (let i = 0; i < this.leftSide.length; i++) {
      this.leftSide[i] = (this.leftSide[i] + this.modulo * div - mergeEqu.leftSide[i] * div) % this.modulo;
      this.rightSide[i] = (this.rightSide[i] + this.modulo * div - mergeEqu.rightSide[i] * div) % this.modulo;
    }
  }

  public fermatTo1(index: number) {
    let multiplier = 1;
    for (let i = 0; i < this.modulo - 2; i++) multiplier *= this.leftSide[index];
    multiplier %= this.modulo;

    for (let i = 0; i < this.leftSide.length; i++) {
      this.leftSide[i] = (this.leftSide[i] * multiplier) % this.modulo;
      this.rightSide[i] = (this.rightSide[i] * multiplier) % this.modulo;
    }
  }
}
