import { useState } from "react";
import { produce } from "immer";

type UserJson = {
  user: {
    name: string;
    age: number;
    address: { city: string; zip: string };
  };
};

export default function JsonUpdateDemo() {
  // 初始 JSON 状态
  const [json, setJsonItem] = useState<UserJson>({
    user: {
      name: "张三",
      age: 20,
      address: { city: "北京", zip: "100000" },
    },
  });

  // ✅ 手动展开写法
  function updateCityManual(newCity: string) {
    setJsonItem((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        address: {
          ...prev.user.address,
          city: newCity,
        },
      },
    }));
  }

  // ✅ Immer 写法
  function updateCityImmer(newCity: string) {
    setJsonItem((prev) =>
      produce(prev, (draft) => {
        draft.user.address.city = newCity;
      })
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>JSON 更新 Demo</h2>

      {/* 显示 JSON */}
      <pre>{JSON.stringify(json, null, 2)}</pre>

      {/* 两种更新方式的按钮 */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => updateCityManual("上海")}>
          手动展开写法：更新城市为 上海
        </button>

        <button
          onClick={() => updateCityImmer("广州")}
          style={{ marginLeft: "10px" }}
        >
          Immer 写法：更新城市为 广州
        </button>
      </div>
    </div>
  );
}
