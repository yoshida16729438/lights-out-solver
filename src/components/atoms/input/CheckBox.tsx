import { FC } from "react";

const CheckBox: FC<{ caption: string; value: boolean; setValue: (value: boolean) => void }> = ({ caption, value, setValue }) => {
  return (
    <div className="form-check form-switch">
      <label className="form-check-label">
        <span>{caption}</span>
        <input className="form-check-input" type="checkbox" role="switch" checked={value} onChange={(e) => setValue(e.target.checked)} />
      </label>
    </div>
  );
};

export default CheckBox;
