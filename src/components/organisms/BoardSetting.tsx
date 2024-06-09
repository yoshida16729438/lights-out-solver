import { FC, useState } from "react";
import { BoardProperties, SolveMode } from "../../types/BoardProperties";
import NumberInput, { NumberInputValue } from "../atoms/input/NumberInput";
import Select from "../atoms/input/Select";
import RadioButton from "../atoms/input/RadioButton";
import PrimaryBtn from "../atoms/button/PrimaryBtn";

const BoardSetting: FC<{ props: BoardProperties; setProps: (value: BoardProperties) => void }> = ({ props, setProps }) => {
  const [height, setHeight] = useState<NumberInputValue>(props.height);
  const [isValidHeight, setIsValidHeight] = useState(true);
  const [width, setWidth] = useState<NumberInputValue>(props.width);
  const [isValidWidth, setIsValidWidth] = useState(true);
  const [colors, setColors] = useState(props.colors);
  const [solveMode, setSolveMode] = useState<number>(props.mode);
  const modeOptions = [
    { text: "ライツアウト", value: 4 },
    { text: "8めくり", value: 8 },
  ];
  const colorOptions = ["2", "3", "5", "7"];

  const onConfirm = () => {
    if (!isValidHeight || !isValidWidth) return;

    //空文字回避が必要
    if (typeof height === "number" && typeof width === "number") {
      setProps({ width, height, colors, mode: solveMode === 4 ? SolveMode.lightsOut : SolveMode.diagonal });
    }
  };

  return (
    <>
      <h1>設定</h1>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <NumberInput caption="高さ" value={height} setValue={setHeight} isValid={isValidHeight} setIsValid={setIsValidHeight} min={2} max={10} />
          </div>
          <div className="col-auto">
            <NumberInput caption="幅" value={width} setValue={setWidth} isValid={isValidWidth} setIsValid={setIsValidWidth} min={2} max={10} />
          </div>
          <div className="col-auto">
            <Select caption="色数" options={colorOptions} value={colors.toString()} setValue={(value) => setColors(parseInt(value))} />
          </div>
          <div className="col-auto">
            <RadioButton caption="モード" name="mode" options={modeOptions} value={solveMode} setValue={setSolveMode} />
          </div>
          <div className="col-auto">
            <PrimaryBtn onClick={onConfirm}>適用</PrimaryBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardSetting;
