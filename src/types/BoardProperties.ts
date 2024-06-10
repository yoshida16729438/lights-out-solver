export type BoardProperties = {
  height: number;
  width: number;
  colors: number;
};

export const defaultBoardProps: BoardProperties = {
  height: 5,
  width: 5,
  colors: 2,
};
