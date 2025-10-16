// pages/CheckboxPage.tsx
import React, { useState } from "react";
import { useCheckboxGroup } from "../hooks/useCheckboxGroup";
import DatePicker from "../components/DatePicker";

const CheckboxPage: React.FC = () => {
  // ✅ checkbox 逻辑封装
  const {
    fruitOptions,
    selectedFruits,
    setSelectedFruits,
    selectAllFruits,
    clearAllFruits,
    isMale,
    setIsMale,
    isFemale,
    setIsFemale,
    toggleGender,
    isDiscount,
    setIsDiscount,
    selectedDate,
    setSelectedDate,
    handleGetDate,
    handleClearDate
  } = useCheckboxGroup();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Checkbox 示例 + 日历组件</h2>

      {/* ✅ 日历组件 */}
      <DatePicker value={selectedDate} onChange={setSelectedDate} />

      {/* ✅ 日期按钮 */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleGetDate}>获取日期</button>
        <button onClick={handleClearDate} style={{ marginLeft: "8px" }}>
          清空日期
        </button>
      </div>

      {/* ✅ 水果组 */}
      <div style={{ border: "1px solid #ccc", padding: "12px", width: "220px" }}>
        <h3>水果选择</h3>
        {fruitOptions.map((option) => (
          <label key={option} style={{ display: "block", marginBottom: "6px" }}>
            <input
              type="checkbox"
              checked={selectedFruits.includes(option)}
              onChange={() => {
                const newSelected = selectedFruits.includes(option)
                  ? selectedFruits.filter((i) => i !== option)
                  : [...selectedFruits, option];
                setSelectedFruits(newSelected);
              }}
            />
            {option}
          </label>
        ))}
      </div>

      {/* ✅ 性别与打折 */}
      <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <h3>附加选项</h3>

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={isMale}
            onChange={(e) => setIsMale(e.target.checked)}
          />
          男士
        </label>

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={isFemale}
            onChange={(e) => setIsFemale(e.target.checked)}
          />
          女士
        </label>

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={isDiscount}
            onChange={(e) => setIsDiscount(e.target.checked)}
          />
          打折
        </label>

        <button onClick={toggleGender} style={{ marginTop: "10px" }}>
          反选性别
        </button>
      </div>

      {/* ✅ 当前状态显示 */}
      <div style={{ marginTop: "20px" }}>
        <p>📅 当前日期：{selectedDate || "未选择"}</p>
        <p>🍎 选中的水果：{selectedFruits.join(", ") || "无"}</p>
        <p>👤 性别：{isMale ? "男" : ""} {isFemale ? "女" : ""}{(!isMale && !isFemale) ? "未选择" : ""}</p>
        <p>💰 是否打折：{isDiscount ? "是" : "否"}</p>

        <button onClick={selectAllFruits}>全选水果</button>
        <button onClick={clearAllFruits} style={{ marginLeft: "8px" }}>
          清空水果
        </button>
      </div>
    </div>
  );
};

export default CheckboxPage;
