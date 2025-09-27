import { HashRouter, Routes, Route } from "react-router-dom";
import StockGrid from "./StockGrid";
import StockDetail from "./StockDetail";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StockGrid />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
