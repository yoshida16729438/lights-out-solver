import { FC } from "react";

const ColorPicker: FC<{ caption: string; value: string; setValue: (value: string) => void }> = ({ caption, value, setValue }) => {
  return (
    <label>
      <span>{caption}</span>
      <input type="color" className="form-control form-control-color" value={value} onChange={(e) => setValue(e.target.value)} />
    </label>
  );
};

export default ColorPicker;
