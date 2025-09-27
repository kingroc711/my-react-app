import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Quote = {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
};

function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);

  const API_KEY = "d39bdqpr01ql85dh1ms0d39bdqpr01ql85dh1msg";

  useEffect(() => {
    if (symbol) {
      fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setQuote(data))
        .catch((err) => console.error("❌ 请求失败", err));
    }
  }, [symbol]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{symbol} 股票详情</h2>
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
      <button onClick={() => navigate("/")}>返回行情表</button>
    </div>
  );
}

export default StockDetail;
