import { useState } from "react";

// 定义用户类型
type User = {
  name: string;
  age: number;
  address: { city: string; zip: string };
};

export default function UserList() {
  // 初始三个人
  const [users, setUsers] = useState<User[]>([
    { name: "张三", age: 20, address: { city: "北京", zip: "100000" } },
    { name: "李四", age: 25, address: { city: "上海", zip: "200000" } },
    { name: "王五", age: 30, address: { city: "广州", zip: "510000" } },
  ]);

  // 更新年龄
  function updateAge(index: number, newAge: number) {
    setUsers((prev) =>
      prev.map((u, i) => (i === index ? { ...u, age: newAge } : u))
    );
  }

  // 更新城市
  function updateCity(index: number, newCity: string) {
    setUsers((prev) =>
      prev.map((u, i) =>
        i === index ? { ...u, address: { ...u.address, city: newCity } } : u
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>用户列表</h2>

      {users.map((u, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p>
            <b>{u.name}</b> - {u.age} 岁 - {u.address.city}
          </p>

          <button onClick={() => updateAge(i, u.age + 1)}>年龄+1</button>
          <button
            onClick={() =>
              updateCity(i, u.address.city === "深圳" ? "杭州" : "深圳")
            }
            style={{ marginLeft: "10px" }}
          >
            切换城市 (深圳/杭州)
          </button>
        </div>
      ))}
    </div>
  );
}
