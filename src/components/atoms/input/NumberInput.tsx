import { ChangeEvent, FC } from "react";

export type NumberInputValue = number | "";

const NumberInput: FC<{ caption: string; value: NumberInputValue; setValue: (value: NumberInputValue) => void; min?: number; max?: number; isValid: boolean; setIsValid: (isValid: boolean) => void; setErrMsg?: (msg: string) => void }> = ({ caption, value, setValue, min, max, isValid, setIsValid, setErrMsg = (_) => {} }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number.isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber);
    if (Number.isNaN(e.target.valueAsNumber)) {
      setIsValid(false);
      setErrMsg("数値を入力してください");
      return;
    }

    if (min && max) {
      if (e.target.valueAsNumber < min || e.target.valueAsNumber > max) {
        setIsValid(false);
        setErrMsg(`${caption}は${min}と${max}の間で設定してください`);
        return;
      }
    } else if (min) {
      if (e.target.valueAsNumber < min) {
        setIsValid(false);
        setErrMsg(`${caption}は${min}以上で設定してください`);
        return;
      }
    } else if (max) {
      if (e.target.valueAsNumber > max) {
        setIsValid(false);
        setErrMsg(`${caption}は${max}以下で設定してください`);
        return;
      }
    }

    setIsValid(true);
    setErrMsg("");
  };

  return (
    <>
      <label>
        <span>{caption}</span>
        <input type="number" className={`form-control ${isValid ? "is-valid" : "is-invalid"}`} max={max} min={min} value={value} onChange={onChange} required />
      </label>
    </>
  );
};

export default NumberInput;
