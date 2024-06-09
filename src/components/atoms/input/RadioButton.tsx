import { ChangeEvent, FC } from "react";

const RadioButton: FC<{ caption: string; name: string; options: { text: string; value: number }[]; value: number; setValue: (value: number) => void }> = ({ caption, name, options, value, setValue }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setValue(parseInt(e.target.value));
  };

  return (
    <div className="d-inline-block">
      <span>{caption}</span>
      {options.map((opt) => {
        return (
          <div className="form-check" key={opt.value}>
            <label className="form-check-label">
              <input type="radio" name={name} className="form-check-input" checked={value === opt.value} value={opt.value} onChange={onChange} />
              <span>{opt.text}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButton;
