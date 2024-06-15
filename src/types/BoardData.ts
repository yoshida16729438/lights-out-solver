export class BoardData {
  private innerValues: number[][];

  public constructor(public readonly height: number, public readonly width: number, private modulo: number) {
    this.innerValues = [...Array(height)].map((_) => [...Array(width)].map((_) => 0));
  }

  public static createFromArray(source: number[][], modulo: number) {
    if (source.length < 2) throw new Error("source配列不正:height異常");

    const width = source[0].length;
    if (source.length < 2) throw new Error("source配列不正:width異常1");

    source.forEach((value) => {
      if (width !== value.length) throw new Error("source配列不正:width異常2");
    });

    const instance = new BoardData(source.length, width, modulo);
    instance.innerValues = source.map((value) => [...value].map((value2) => value2 % modulo));
    return instance;
  }

  public createCopy() {
    const newInstance = new BoardData(this.height, this.width, this.modulo);
    newInstance.innerValues = this.innerValues.map((value) => [...value]);
    return newInstance;
  }

  public changeModulo(modulo: number) {
    const newInstance = new BoardData(this.height, this.width, modulo);
    newInstance.innerValues = this.innerValues.map((value) => [...value].map((value2) => value2 % modulo));
    return newInstance;
  }

  public getRow(rowIndex: number) {
    return [...this.innerValues[rowIndex]];
  }

  public getValue(rowIndex: number, columnIndex: number) {
    return this.innerValues[rowIndex][columnIndex];
  }

  public increment(rowIndex: number, columnIndex: number) {
    if (this.isInRange(rowIndex, columnIndex)) {
      this.innerValues[rowIndex][columnIndex] = (this.innerValues[rowIndex][columnIndex] + 1) % this.modulo;
    }
  }

  public isInRange(rowIndex: number, columnIndex: number) {
    return 0 <= rowIndex && rowIndex < this.height && 0 <= columnIndex && columnIndex < this.width;
  }

  public map<T>(callbackFn: (value: number[], index: number) => T): T[] {
    return this.innerValues.map(callbackFn);
  }
}
