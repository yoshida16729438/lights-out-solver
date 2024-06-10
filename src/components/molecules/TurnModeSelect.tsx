import { FC, useState } from "react";
import { TurnMode } from "../../types/TurnMode";
import RadioButton from "../atoms/input/RadioButton";

const TurnModeSelect: FC<{ name: string; options: { text: string; value: TurnMode }[]; value: TurnMode; setValue: (value: TurnMode) => void }> = ({ name, options, value, setValue }) => {
  const [innerValue, setInnerValue] = useState<number>(value);

  const onChange = (v: number) => {
    setInnerValue(v);
    setValue(options.find((opt) => opt.value === v)!.value);
  };

  return <RadioButton caption="モード" name={name} options={options} value={innerValue} setValue={onChange} />;
};

export default TurnModeSelect;
