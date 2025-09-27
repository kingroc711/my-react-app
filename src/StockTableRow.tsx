import { useNavigate } from "react-router-dom";
import styles from "./StockGrid.module.css";

type Stock = {
  symbol: string;
  price: number;
  change: number;
};

type Props = {
  stock: Stock;
};

function StockTableRow({ stock }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.table} ${styles.row}`}
      onClick={() => navigate(`/stock/${stock.symbol}`)}
    >
      <div className={styles.cell}>{stock.symbol}</div>
      <div className={styles.cell}>{stock.price?.toFixed(2) ?? "-"}</div>
      <div
        className={styles.cell}
        style={{ color: stock.change >= 0 ? "green" : "red" }}
      >
        {stock.change?.toFixed(2)}%
      </div>
    </div>
  );
}

export default StockTableRow;
