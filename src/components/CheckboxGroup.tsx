// components/CheckboxGroup.tsx
import React from "react";

type CheckboxGroupProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selected, onChange }) => {
  const handleCheckboxChange = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", width: "200px" }}>
      <h4>水果选择</h4>
      {options.map((option) => (
        <label key={option} style={{ display: "block", marginBottom: "6px" }}>
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
