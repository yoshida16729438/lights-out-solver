import { ChangeEvent, FC, useEffect } from "react";

export type NumberInputValue = number | "";

const NumberInput: FC<{ caption: string; value: NumberInputValue; setValue: (value: NumberInputValue) => void; min?: number; max?: number; isValid: boolean; setIsValid: (isValid: boolean) => void; setErrMsg?: (msg: string) => void }> = ({ caption, value, setValue, min, max, isValid, setIsValid, setErrMsg = (_) => {} }) => {
  const validate = (value: number) => {
    if (Number.isNaN(value)) {
      setErrMsg("数値を入力してください");
      return false;
    }

    if (typeof min !== "undefined" && typeof max !== "undefined") {
      if (value < min || value > max) {
        setErrMsg(`${caption}は${min}と${max}の間で設定してください`);
        return false;
      }
    } else if (typeof min !== "undefined") {
      if (value < min) {
        setErrMsg(`${caption}は${min}以上で設定してください`);
        return false;
      }
    } else if (typeof max !== "undefined") {
      if (value > max) {
        setErrMsg(`${caption}は${max}以下で設定してください`);
        return false;
      }
    }

    setErrMsg("");
    return true;
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number.isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber);
  };

  useEffect(() => {
    setIsValid(validate(typeof value === "number" ? value : 0));
    //eslint-disable-next-line
  }, [max, min, value]);

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
