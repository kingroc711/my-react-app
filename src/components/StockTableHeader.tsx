import styles from "../styles/StockGrid.module.css";

type Props = {
  sortBy: "symbol" | "price" | "change";
  sortOrder: "asc" | "desc";
  onSort: (field: "symbol" | "price" | "change") => void;
};

function StockTableHeader({ sortBy, sortOrder, onSort }: Props) {
  const renderArrow = (field: "symbol" | "price" | "change") =>
    sortBy === field ? (sortOrder === "asc" ? "↑" : "↓") : "";

  return (
    <div className={`${styles.table} ${styles.header}`}>
      <div className={styles.cell} onClick={() => onSort("symbol")}>
        股票代码 {renderArrow("symbol")}
      </div>
      <div className={styles.cell} onClick={() => onSort("price")}>
        当前价格 {renderArrow("price")}
      </div>
      <div className={styles.cell} onClick={() => onSort("change")}>
        涨跌幅% {renderArrow("change")}
      </div>
    </div>
  );
}

export default StockTableHeader;
