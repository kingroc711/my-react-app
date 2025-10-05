// src/contexts/StockContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";

type StockCtx = {
  selectedSymbol: string | null;
  setSelectedSymbol: (s: string | null) => void;
};

const StockContext = createContext<StockCtx | null>(null);

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock 必须在 <StockProvider> 内使用");
  return ctx;
}

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const value = useMemo(() => ({ selectedSymbol, setSelectedSymbol }), [selectedSymbol]);
  return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
}
