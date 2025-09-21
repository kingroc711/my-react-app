import { useState } from "react";
import styles from "./StockTable.module.css";

type Stock = {
  code: string;
  name: string;
  price: number;
  change: number;
};

function StockGrid() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "change">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const stocks: Stock[] = [
    { code: "600001", name: "浦发银行", price: 12.3, change: 0.56 },
    { code: "600002", name: "万科A", price: 18.7, change: -0.42 },
    { code: "600003", name: "贵州茅台", price: 1550.25, change: 1.23 },
    { code: "600004", name: "中国石化", price: 5.63, change: -0.12 },
  ];

  // 排序逻辑
  const sortedStocks = [...stocks].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>股票行情一览表</h2>

      {/* 表头 */}
      <div className={`${styles.table} ${styles.header}`}>
        <div className={styles.cell}>代码</div>
        <div className={styles.cell}>名称</div>
        <div
          className={styles.cell}
          onClick={() => {
            setSortBy("price");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          价格 {sortBy === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            setSortBy("change");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          涨跌幅 {sortBy === "change" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </div>
      </div>

      {/* 数据行 */}
      {sortedStocks.map((s) => (
        <div
          key={s.code}
          className={`${styles.table} ${styles.row} ${
            selectedCode === s.code ? styles.selected : ""
          }`}
          onClick={() => setSelectedCode(s.code)}
        >
          <div className={styles.cell}>{s.code}</div>
          <div className={styles.cell}>{s.name}</div>
          <div className={styles.cell}>{s.price.toFixed(2)}</div>
          <div
            className={`${styles.cell} ${
              s.change >= 0 ? styles.positive : styles.negative
            }`}
          >
            {s.change > 0 ? `+${s.change}%` : `${s.change}%`}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockGrid;
