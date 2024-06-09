import { FC } from "react";

const Select: FC<{ caption: string; options: string[]; value: string; setValue: (value: string) => void }> = ({ caption, options, value, setValue }) => {
  return (
    <label>
      <span>{caption}</span>
      <select className="form-select" value={value} onChange={(e) => setValue(e.target.value)} required>
        {options.map((opt) => {
          return (
            <option value={opt} key={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default Select;
