type Stock = {
  code: string;
  name: string;
  price: number;
  change: number;
};

function StockTable() {
  const stocks: Stock[] = [
    { code: "600001", name: "浦发银行", price: 12.3, change: 0.56 },
    { code: "600002", name: "万科A", price: 18.7, change: -0.42 },
    { code: "600003", name: "贵州茅台", price: 1550.25, change: 1.23 },
    { code: "600004", name: "中国石化", price: 5.63, change: -0.12 },
    { code: "600005", name: "中国银行", price: 3.25, change: 0.08 },
    { code: "600006", name: "招商银行", price: 38.9, change: -0.75 },
    { code: "600007", name: "工商银行", price: 4.56, change: 0.21 },
    { code: "600008", name: "平安银行", price: 10.78, change: -0.34 },
    { code: "600009", name: "中国移动", price: 98.67, change: 2.15 },
    { code: "600010", name: "京东方A", price: 2.45, change: -1.02 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>股票行情一览表</h2>
      <p>共 {stocks.length} 只股票</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>代码</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>名称</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>价格</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>涨跌幅</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.code}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {s.code}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {s.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {s.price.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  color: s.change >= 0 ? "green" : "red",
                }}
              >
                {s.change > 0 ? `+${s.change}%` : `${s.change}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
