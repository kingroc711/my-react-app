import { useEffect, useState } from "react";
import styles from "./StockGrid.module.css";

type Stock = {
  symbol: string;
  price: number;
  change: number; // 涨跌幅 %
};

const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"]; // 美股示例

function StockGrid() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"symbol" | "price" | "change">("symbol");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // 表单控件
  const [keyword, setKeyword] = useState(""); // 搜索框
  const [filter, setFilter] = useState("all"); // 下拉筛选

  const API_KEY = "d39bdqpr01ql85dh1ms0d39bdqpr01ql85dh1msg"; // 你的 Finnhub API key

  // 拉取数据
  async function fetchData() {
    try {
      const promises = symbols.map(async (sym) => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`
        );
        const json = await res.json();
        return {
          symbol: sym,
          price: json.c,
          change: json.dp,
        };
      });
      const results = await Promise.all(promises);
      setStocks(results);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("❌ 获取行情失败:", err);
    }
  }

  // 定时刷新
  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 5000);
    return () => clearInterval(timer);
  }, []);

  // 排序
  const sortedStocks = [...stocks].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  // 搜索 + 筛选
  const filteredStocks = sortedStocks
    .filter((s) => s.symbol.toLowerCase().includes(keyword.toLowerCase()))
    .filter((s) => {
      if (filter === "up") return s.change > 0;
      if (filter === "down") return s.change < 0;
      return true;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h2>美股实时行情（带搜索 & 筛选）</h2>
      <p>最后更新时间：{lastUpdate}</p>

      {/* 搜索框 + 下拉框 */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="输入股票代码"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="all">全部</option>
          <option value="up">上涨</option>
          <option value="down">下跌</option>
        </select>
      </div>

      {/* 表头 */}
      <div className={`${styles.table} ${styles.header}`}>
        <div
          className={styles.cell}
          onClick={() => {
            setSortBy("symbol");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          股票代码 {sortBy === "symbol" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            setSortBy("price");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          当前价格 {sortBy === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </div>
        <div
          className={styles.cell}
          onClick={() => {
            setSortBy("change");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          涨跌幅% {sortBy === "change" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </div>
      </div>

      {/* 行数据 */}
      {filteredStocks.length > 0 ? (
        filteredStocks.map((s) => (
          <div
            key={s.symbol}
            className={`${styles.table} ${styles.row} ${
              selected === s.symbol ? styles.selected : ""
            }`}
            onClick={() => setSelected(s.symbol)}
          >
            <div className={styles.cell}>{s.symbol}</div>
            <div className={styles.cell}>{s.price?.toFixed(2) ?? "-"}</div>
            <div
              className={styles.cell}
              style={{ color: s.change >= 0 ? "green" : "red" }}
            >
              {s.change?.toFixed(2)}%
            </div>
          </div>
        ))
      ) : (
        <p>无匹配股票</p>
      )}
    </div>
  );
}

export default StockGrid;
