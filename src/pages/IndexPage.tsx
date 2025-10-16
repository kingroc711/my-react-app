import { Link } from "react-router-dom";

function IndexPage() {
  const topics = [
    { title: "课题1：股票行情系统", path: "/stock-grid" },
    { title: "课题2：模态弹窗示例", path: "/modal-demo" },
    { title: "课题3：表单练习", path: "/form-demo" },
    { title: "课题4：复选框示例", path: "/checkbox-demo" },
  ];

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>📘 React 学习主页</h1>
      <p style={{ textAlign: "center" }}>点击进入各课题学习页面</p>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
        {topics.map((t) => (
          <li key={t.path} style={{ margin: "15px 0" }}>
            <Link
              to={t.path}
              style={{
                textDecoration: "none",
                fontSize: "18px",
                color: "#007bff",
              }}
            >
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexPage;
