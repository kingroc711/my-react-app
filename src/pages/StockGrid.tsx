import { useEffect, useState } from "react";
import StockFilter from "../components/StockFilter";
import StockTableHeader from "../components/StockTableHeader";
import StockTableRow from "../components/StockTableRow";
import StockNoteModal from "../components/StockNoteModal"; // 👈 新增

type Stock = {
  symbol: string;
  price: number;
  change: number;
};

const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"];

function StockGrid() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [sortBy, setSortBy] = useState<"symbol" | "price" | "change">("symbol");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // 表单状态
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");

  // 新增：备注相关状态
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const API_KEY = "d39bdqpr01ql85dh1ms0d39bdqpr01ql85dh1msg";

  async function fetchData() {
    try {
      const promises = symbols.map(async (sym) => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${API_KEY}`
        );
        const json = await res.json();
        return { symbol: sym, price: json.c, change: json.dp };
      });
      const results = await Promise.all(promises);
      setStocks(results);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("❌ 获取行情失败:", err);
    }
  }

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 5000);
    return () => clearInterval(timer);
  }, []);

  // 排序逻辑
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

  // 排序切换函数
  const handleSort = (field: "symbol" | "price" | "change") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // 👇 新增：保存备注的函数
  const handleSaveNote = (note: string) => {
    if (selectedSymbol) {
      setNotes((prev) => ({ ...prev, [selectedSymbol]: note }));
    }
    setSelectedSymbol(null); // 关闭弹窗
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>美股实时行情</h2>
      <p>最后更新时间：{lastUpdate}</p>

      {/* 筛选区 */}
      <StockFilter
        keyword={keyword}
        filter={filter}
        onKeywordChange={setKeyword}
        onFilterChange={setFilter}
      />

      {/* 表头 */}
      <StockTableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />

      {/* 行数据 */}
      {filteredStocks.length > 0 ? (
        filteredStocks.map((s) => (
          <div key={s.symbol} style={{ display: "flex", alignItems: "center" }}>
            <StockTableRow stock={s} />
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedSymbol(s.symbol)}
            >
              添加备注
            </button>
          </div>
        ))
      ) : (
        <p>无匹配股票</p>
      )}

      {/* 👇 新增：备注展示 */}
      {Object.keys(notes).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>我的备注：</h3>
          <ul>
            {Object.entries(notes).map(([sym, note]) => (
              <li key={sym}>
                <strong>{sym}：</strong> {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 👇 弹出输入窗口 */}
      {selectedSymbol && (
        <StockNoteModal
          symbol={selectedSymbol}
          onOk={handleSaveNote}
          onCancel={() => setSelectedSymbol(null)}
        />
      )}
    </div>
  );
}

export default StockGrid;
