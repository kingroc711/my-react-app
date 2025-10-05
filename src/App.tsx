import { HashRouter, Routes, Route } from "react-router-dom";
import StockGrid from "./pages/StockGrid";
import StockDetail from "./pages/StockDetail";
import { StockProvider } from "./contexts/StockContext.tsx";  

function App() {
  return (
    <StockProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<StockGrid />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
      </Routes>
    </HashRouter>
    </StockProvider>
  );
}

export default App;
