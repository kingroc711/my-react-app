// hooks/useCheckboxGroup.ts
import { useState } from "react";

export function useCheckboxGroup() {
  // ✅ 水果 checkbox 状态
  const fruitOptions = ["苹果", "香蕉", "草莓", "芒果"];
  const [selectedFruits, setSelectedFruits] = useState<string[]>(["香蕉"]);

  const selectAllFruits = () => setSelectedFruits(fruitOptions);
  const clearAllFruits = () => setSelectedFruits([]);
  
   // ✅ 日历状态
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // ✅ 性别 checkbox 状态
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  
   // ✅ 打折 checkbox 状态
  const [isDiscount, setIsDiscount] = useState(true);

  const toggleGender = () => {
    if (!isMale && !isFemale) {
      setIsMale(true);
      setIsFemale(true);
    } else if (isMale && isFemale) {
      setIsMale(false);
      setIsFemale(false);
    } else {
      setIsMale(!isMale);
      setIsFemale(!isFemale);
    }
  };

    // ✅ 获取日期
  const handleGetDate = () => {
    if (selectedDate) {
      alert(`当前选择的日期是：${selectedDate}`);
    } else {
      alert("还没有选择日期！");
    }
  };

  return {
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
    handleGetDate
  };
}
