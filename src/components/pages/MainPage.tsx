import { FC, useEffect, useState } from "react";
import { BoardProperties, defaultBoardProps } from "../../types/BoardProperties";
import BoardSetting from "../organisms/BoardSetting";
import Board from "../organisms/board/Board";
import { TurnMode } from "../../types/TurnMode";
import TurnModeSelect from "../molecules/TurnModeSelect";
import { loadEnvironmentSettings, reflectEnvironmentSettings } from "../../utils/EnvironmentSettingsUtil";
import { useShowValueContext } from "../../providers/ShowValueProvider";
import { BoardData } from "../../types/BoardData";

const MainPage: FC = () => {
  const { showValue } = useShowValueContext();
  const [boardProps, setBoardProps] = useState(defaultBoardProps);
  const [turnMode, setTurnMode] = useState(TurnMode.lightsOut);
  const turnModeOptions = [
    { text: "ライツアウト", value: TurnMode.lightsOut },
    { text: "8めくり", value: TurnMode.diagonal },
  ];
  const [freeBoardProps, setFreeBoardProps] = useState(defaultBoardProps);
  const [freeTurnMode, setFreeTurnMode] = useState(TurnMode.lightsOut);
  const freeTurnModeOptions = [
    { text: "単体", value: TurnMode.single },
    { text: "ライツアウト", value: TurnMode.lightsOut },
    { text: "8めくり", value: TurnMode.diagonal },
  ];

  const finalBoardInitialState = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
  ];

  const [initialBoard, setInitialBoard] = useState(new BoardData(finalBoardInitialState.length, finalBoardInitialState[0].length, defaultBoardProps.colors));
  const [finallBoard, setfinalBoard] = useState(BoardData.createFromArray(finalBoardInitialState, defaultBoardProps.colors));
  const [freeBoard, setFreeBoard] = useState(new BoardData(defaultBoardProps.height, defaultBoardProps.width, defaultBoardProps.colors));

  const onSetBoardProps = (newProps: BoardProperties) => {
    if (boardProps.height === newProps.height && boardProps.width === newProps.width) {
      if (boardProps.colors !== newProps.colors) {
        setInitialBoard(initialBoard.changeModulo(newProps.colors));
        setfinalBoard(finallBoard.changeModulo(newProps.colors));
        setBoardProps(newProps);
      }
    } else {
      setInitialBoard(new BoardData(newProps.height, newProps.width, newProps.colors));
      setfinalBoard(new BoardData(newProps.height, newProps.width, newProps.colors));
      setBoardProps(newProps);
    }
  };

  const onSetFreeBoardProps = (newProps: BoardProperties) => {
    if (freeBoardProps.height === newProps.height && freeBoardProps.width === newProps.width) {
      if (freeBoardProps.colors !== newProps.colors) {
        setFreeBoard(freeBoard.changeModulo(newProps.colors));
        setFreeBoardProps(newProps);
      }
    } else {
      setFreeBoard(new BoardData(newProps.height, newProps.width, newProps.colors));
      setFreeBoardProps(newProps);
    }
  };

  useEffect(() => {
    const environmentSettings = loadEnvironmentSettings();
    reflectEnvironmentSettings(environmentSettings, environmentSettings);
  }, []);

  return (
    <main className="container-fluid mb-3">
      <section className="row justify-content-center m-1">
        <div className="col-auto">
          <h1 className="row">設定</h1>
          <div className="row">
            <div className="col-auto">
              <h2>盤面設定</h2>
              <BoardSetting props={boardProps} setProps={onSetBoardProps} />
            </div>
            <div className="col-auto">
              <h2>動作設定</h2>
              <TurnModeSelect name="mode" options={turnModeOptions} value={turnMode} setValue={setTurnMode} />
            </div>
          </div>
        </div>
      </section>

      <section className="row justify-content-center m-1 mb-5">
        <section className="col-auto">
          <h1>初期状態</h1>
          <Board values={initialBoard} setValues={setInitialBoard} showValue={showValue} showColor />
        </section>
        <section className="col-auto">
          <h1>最終状態</h1>
          <Board values={finallBoard} setValues={setfinalBoard} showValue={showValue} showColor />
        </section>
      </section>

      <section className="row justify-content-center m-1">
        <div className="col-auto">
          <div className="row">
            <h1 className="col-auto">フリースペース</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <div className="row">
                <div className="col-auto">
                  <h2>盤面設定</h2>
                  <BoardSetting props={freeBoardProps} setProps={onSetFreeBoardProps} />
                </div>
              </div>
              <div className="row">
                <div className="col-auto">
                  <h2>動作設定</h2>
                  <TurnModeSelect name="freemode" options={freeTurnModeOptions} value={freeTurnMode} setValue={setFreeTurnMode} />
                </div>
              </div>
            </div>
            <div className="col-auto">
              <Board values={freeBoard} setValues={setFreeBoard} showValue={showValue} showColor isPreview={false} enableClick turnMode={freeTurnMode} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
