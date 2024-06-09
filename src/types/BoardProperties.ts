export enum SolveMode {
  lightsOut = 4,
  diagonal = 8,
}

export type BoardProperties = {
  height: number;
  width: number;
  colors: number;
  mode: SolveMode;
};

export const defaultBoardProps: BoardProperties = {
  height: 5,
  width: 5,
  colors: 2,
  mode: SolveMode.lightsOut,
};
