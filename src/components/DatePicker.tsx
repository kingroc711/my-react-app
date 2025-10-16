// components/DatePicker.tsx
import React from "react";

type DatePickerProps = {
  value: string | null;
  onChange: (date: string | null) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontWeight: "bold", marginRight: "8px" }}>选择日期：</label>
      <input
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      />
    </div>
  );
};

export default DatePicker;
