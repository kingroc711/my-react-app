import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
} from "recharts";

// Finnhub 返回的数据类型
type Quote = {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
};

type ChartPoint = {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");

  const API_KEY = "d39bdqpr01ql85dh1ms0d39bdqpr01ql85dh1msg";

  // 获取当前行情
  async function fetchQuote() {
    if (!symbol) return;
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      const data = await res.json();
      setQuote(data);

      // 时间标签
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      // 生成点数据（简化版 K 线：用 open/high/low/close）
      const newPoint: ChartPoint = {
        time: timeLabel,
        price: data.c,
        open: data.o,
        high: data.h,
        low: data.l,
        close: data.c,
      };

      setChartData((prev) => [...prev.slice(-19), newPoint]); // 只保留最近 20 条
    } catch (err) {
      console.error("❌ 请求失败", err);
    }
  }

  useEffect(() => {
    fetchQuote();
    const timer = setInterval(fetchQuote, 5000); // 每 5 秒刷新一次
    return () => clearInterval(timer);
  }, [symbol]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{symbol} 股票详情</h2>

      {/* 基本行情信息 */}
      {quote ? (
        <ul>
          <li>当前价：{quote.c}</li>
          <li>涨跌额：{quote.d}</li>
          <li>涨跌幅：{quote.dp}%</li>
          <li>开盘：{quote.o}</li>
          <li>最高：{quote.h}</li>
          <li>最低：{quote.l}</li>
          <li>昨收：{quote.pc}</li>
        </ul>
      ) : (
        <p>加载中...</p>
      )}

      {/* 图表切换按钮 */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setChartType("line")}>折线图</button>
        <button onClick={() => setChartType("candlestick")}>K 线图</button>
      </div>

      {/* 折线图 */}
      {chartType === "line" && (
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      )}

      {/* K 线图（简化版，用 Bar 模拟） */}
      {chartType === "candlestick" && (
        <ComposedChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="open" fill="#82ca9d" />
          <Bar dataKey="close" fill="#8884d8" />
        </ComposedChart>
      )}

      <br />
      <button onClick={() => navigate("/")}>返回行情表</button>
    </div>
  );
}

export default StockDetail;
