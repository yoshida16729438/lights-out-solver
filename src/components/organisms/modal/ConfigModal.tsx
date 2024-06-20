import { FC, MouseEventHandler, useEffect, useState } from "react";
import ModalContainer from "../../molecules/modal/ModalContainer";
import ModalHeader from "../../molecules/modal/ModalHeader";
import ModalBody from "../../molecules/modal/ModalBody";
import ModalFooter3Btn from "../../molecules/modal/ModalFooter3Btn";
import { EnvironmentValues, defaultEnvironmentValues, loadEnvironmentSettings, reflectEnvironmentSettings, saveEnvironmentSettings } from "../../../utils/EnvironmentSettingsUtil";
import NumberInput, { NumberInputValue } from "../../atoms/input/NumberInput";
import Toast from "../Toast";
import ColorPicker from "../../atoms/input/ColorPicker";
import Board from "../board/Board";
import CheckBox from "../../atoms/input/CheckBox";
import { useShowValueContext } from "../../../providers/ShowValueProvider";
import { useRealTimeContext } from "../../../providers/RealTimeProvider";
import { BoardData } from "../../../types/BoardData";

const ConfigModal: FC<{ onClose: MouseEventHandler<HTMLButtonElement> }> = ({ onClose }) => {
  //全体
  const [currentSettings, setCurrentSettings] = useState({} as EnvironmentValues);

  //セルサイズ
  const [lastValidCellSize, setLastValidCellSize] = useState(0);
  const [cellSize, setCellSize] = useState<NumberInputValue>("");
  const [isValidCellSize, setIsValidCellSize] = useState(true);
  const [cellSizeErrMsg, setCellSizeErrMsg] = useState("");
  const [isToastLiving, setIsToastLiving] = useState(false);

  //色
  const [colors, setColors] = useState<string[]>([]);

  //テキスト表示
  const [showValue, setShowValue] = useState(false);

  //リアルタイム
  const [realTime, setRealTime] = useState(true);

  //盤面(全ての隣り合わせの組み合わせが存在する並び)
  const previewValue = [
    [0, 1, 2, 3],
    [3, 4, 5, 6],
    [1, 6, 0, 2],
    [5, 3, 4, 2],
  ];
  const boardValue = BoardData.createFromArray(previewValue, 7);

  const { setShowValue: setShowValueContext } = useShowValueContext();
  const { setRealTime: setRealTimeContext } = useRealTimeContext();

  //全反映
  const setAll = (settings: EnvironmentValues) => {
    setCellSize(settings.cellSize);
    setLastValidCellSize(settings.cellSize);
    setColors(settings.colors);
    setShowValue(settings.showValue);
    setRealTime(settings.realTime);
  };

  //初期化
  useEffect(() => {
    const loadedSettings = loadEnvironmentSettings();
    setCurrentSettings(loadedSettings);
    reflectEnvironmentSettings(loadedSettings, loadedSettings);
    setAll(loadedSettings);
  }, []);

  const setCellSizeWrapper = (value: NumberInputValue) => {
    setCellSize(value);
    if (typeof value === "number") {
      setLastValidCellSize(value);
      const newSettings = { cellSize: value, colors, showValue, realTime };
      reflectEnvironmentSettings(currentSettings, newSettings);
    }
  };

  const setColorsWrapperGenerator = (index: number) => (value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);

    const newSettings = { cellSize: lastValidCellSize, colors: newColors, showValue, realTime };
    reflectEnvironmentSettings(currentSettings, newSettings);
  };

  const setShowValueWrapper = (value: boolean) => {
    setShowValue(value);
    const newSettings = { cellSize: lastValidCellSize, colors, showValue: value, realTime };
    reflectEnvironmentSettings(currentSettings, newSettings);
  };

  const setRealTimeWrapper = (value: boolean) => {
    setRealTime(value);
    const newSettings = { cellSize: lastValidCellSize, colors, showValue, realTime: value };
    reflectEnvironmentSettings(currentSettings, newSettings);
  };

  const onClickComplete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValidCellSize) {
      setIsToastLiving(true);
      return;
    }
    setIsToastLiving(false);
    const newSettings = { cellSize: lastValidCellSize, colors, showValue, realTime };
    saveEnvironmentSettings(newSettings);
    setShowValueContext(showValue);
    setRealTimeContext(realTime);
    reflectEnvironmentSettings(newSettings, newSettings);
    onClose(e);
  };

  const onClickReset = () => {
    setAll(defaultEnvironmentValues);
    reflectEnvironmentSettings(currentSettings, defaultEnvironmentValues);
  };

  return (
    <ModalContainer>
      <>
        <ModalHeader>詳細設定</ModalHeader>
        <ModalBody>
          <div className="container">
            <h1 className="fs-6 row mb-3">表示設定</h1>
            <div className="row mb-3">
              <div className="col-auto">
                <NumberInput caption="マスの大きさ" value={cellSize} setValue={setCellSizeWrapper} min={30} max={100} isValid={isValidCellSize} setIsValid={setIsValidCellSize} setErrMsg={setCellSizeErrMsg} />
              </div>
            </div>
            <div className="row mb-3">
              {colors.map((color, index) => {
                return (
                  <div className="col-auto" key={index}>
                    <ColorPicker caption={`色${index + 1}`} value={color} setValue={setColorsWrapperGenerator(index)} />
                  </div>
                );
              })}
            </div>
            <div className="row mb-3">
              <CheckBox caption="値を表示" value={showValue} setValue={setShowValueWrapper} />
            </div>
            <div className="row mb-3">
              <span>プレビュー</span>
              <Board values={boardValue} showValue={showValue} isPreview showColor />
            </div>
            <h1 className="fs-6 row mb-3">動作設定</h1>
            <div className="row">
              <CheckBox caption="リアルタイムモード" value={realTime} setValue={setRealTimeWrapper} />
              <p>※offは低スペック環境向け</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter3Btn completeText="保存" onComplete={onClickComplete} cancelText="取消" onCancel={onClose} otherText="初期化" onOther={onClickReset} />
        {isToastLiving && <Toast forceClose={() => setIsToastLiving(false)}>{cellSizeErrMsg}</Toast>}
      </>
    </ModalContainer>
  );
};

export default ConfigModal;
