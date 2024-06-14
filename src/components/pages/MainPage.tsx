import { FC, useEffect, useState } from "react";
import { defaultBoardProps } from "../../types/BoardProperties";
import BoardSetting from "../organisms/BoardSetting";
import Board from "../organisms/board/Board";
import { TurnMode } from "../../types/TurnMode";
import TurnModeSelect from "../molecules/TurnModeSelect";
import { loadEnvironmentSettings, reflectEnvironmentSettings } from "../../utils/EnvironmentSettingsUtil";
import { useShowValueContext } from "../../providers/ShowValueProvider";

const MainPage: FC = () => {
  const { showValue } = useShowValueContext();
  const [boardProps, setBoardProps] = useState(defaultBoardProps);
  const [turnMode, setTurnMode] = useState(TurnMode.lightsOut);
  const turnModeOptions = [
    { text: "ライツアウト", value: TurnMode.lightsOut },
    { text: "8めくり", value: TurnMode.diagonal },
  ];
  const initialArray = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
  ];
  const [array, setArray] = useState(initialArray);

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
              <BoardSetting props={boardProps} setProps={setBoardProps} />
            </div>
            <div className="col-auto">
              <h2>動作設定</h2>
              <TurnModeSelect name="mode" options={turnModeOptions} value={turnMode} setValue={setTurnMode} />
            </div>
          </div>
        </div>
      </section>

      <section className="row justify-content-center">
        <section className="col-auto">
          <h1>初期状態</h1>
          <Board values={array} setValues={setArray} showValue={showValue} showColor={true} isPreview={false} modulo={boardProps.colors} enableClick={true} turnMode={TurnMode.single} />
        </section>
      </section>
    </main>
  );
};

export default MainPage;
