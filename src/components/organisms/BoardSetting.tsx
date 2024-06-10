import { FC, useState } from "react";
import { BoardProperties } from "../../types/BoardProperties";
import NumberInput, { NumberInputValue } from "../atoms/input/NumberInput";
import Select from "../atoms/input/Select";
import PrimaryBtn from "../atoms/button/PrimaryBtn";
import Toast from "./Toast";

const BoardSetting: FC<{ props: BoardProperties; setProps: (value: BoardProperties) => void }> = ({ props, setProps }) => {
  const [height, setHeight] = useState<NumberInputValue>(props.height);
  const [isValidHeight, setIsValidHeight] = useState(true);
  const [heightErrMsg, setHeightErrMsg] = useState("");
  const [width, setWidth] = useState<NumberInputValue>(props.width);
  const [isValidWidth, setIsValidWidth] = useState(true);
  const [widthErrMsg, setWidthErrMsg] = useState("");
  const [colors, setColors] = useState(props.colors);
  const [isToastLiving, setIsToastLiving] = useState(false);
  const [mergedErrMsg, setMergedErrMsg] = useState("");

  const colorOptions = ["2", "3", "5", "7"];

  const onConfirm = () => {
    if (!isValidHeight) {
      setMergedErrMsg(heightErrMsg);
      setIsToastLiving(true);
      return;
    }
    if (!isValidWidth) {
      setMergedErrMsg(widthErrMsg);
      setIsToastLiving(true);
      return;
    }

    setIsToastLiving(false);

    //空文字回避が必要
    if (typeof height === "number" && typeof width === "number") {
      setProps({ width, height, colors });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-auto mb-3">
            <NumberInput caption="高さ" value={height} setValue={setHeight} isValid={isValidHeight} setIsValid={setIsValidHeight} setErrMsg={setHeightErrMsg} min={2} max={10} />
          </div>
          <div className="col-auto mb-3">
            <NumberInput caption="幅" value={width} setValue={setWidth} isValid={isValidWidth} setIsValid={setIsValidWidth} setErrMsg={setWidthErrMsg} min={2} max={10} />
          </div>
          <div className="col-auto mb-3">
            <Select caption="色数" options={colorOptions} value={colors.toString()} setValue={(value) => setColors(parseInt(value))} />
          </div>
          <div className="col-auto align-self-end mb-3">
            <PrimaryBtn onClick={onConfirm}>適用</PrimaryBtn>
          </div>
        </div>
      </div>
      {isToastLiving && <Toast forceClose={() => setIsToastLiving(false)}>{mergedErrMsg}</Toast>}
    </>
  );
};

export default BoardSetting;
