type Props = {
  keyword: string;
  filter: string;
  onKeywordChange: (value: string) => void;
  onFilterChange: (value: string) => void;
};

function StockFilter({ keyword, filter, onKeywordChange, onFilterChange }: Props) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="输入股票代码"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="all">全部</option>
        <option value="up">上涨</option>
        <option value="down">下跌</option>
      </select>
    </div>
  );
}

export default StockFilter;
