import { HashRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";       // 新增首页
import StockGrid from "./pages/StockGrid";
import StockDetail from "./pages/StockDetail";
import ModalDemo from "./pages/ModalDemo.tsx";       // 新增课题示例
import FormDemo from "./pages/FormDemo";         // 新增课题示例
import CheckboxContainer from "./pages/CheckBox/CheckboxContainer.tsx"; // 新增课题示例

import { StockProvider } from "./contexts/StockContext";

function App() {
  return (
    <StockProvider>
      <HashRouter>
        <Routes>
          {/* 首页 */}
          <Route path="/" element={<IndexPage />} />

          {/* 课题1：股票行情 */}
          <Route path="/stock-grid" element={<StockGrid />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />

          {/* 课题2：模态弹窗 */}
          <Route path="/modal-demo" element={<ModalDemo />} />

          {/* 课题3：表单练习 */}
          <Route path="/form-demo" element={<FormDemo />} />
          
          {/* 课题4：复选框示例 */}
          <Route path="/checkbox-demo" element={<CheckboxContainer />} />
        
        </Routes>
      </HashRouter>
    </StockProvider>
  );
}

export default App;
