import { useState } from "react";

interface StockNoteModalProps {
  symbol: string;
  onOk: (note: string) => void;
  onCancel: () => void;
}

function StockNoteModal({ symbol, onOk, onCancel }: StockNoteModalProps) {
  const [note, setNote] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h3>备注股票：{symbol}</h3>
        <textarea
          placeholder="请输入备注..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            marginTop: "10px",
            padding: "8px",
            fontSize: "14px",
          }}
        />
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <button onClick={onCancel}>取消</button>
          <button
            onClick={() => onOk(note)}
            style={{ marginLeft: "8px", background: "#4CAF50", color: "white" }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockNoteModal;
