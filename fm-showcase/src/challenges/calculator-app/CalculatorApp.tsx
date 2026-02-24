import { useState, useEffect, useReducer } from "react";
import { reducer} from "./calculatorReducer";
import ThemeSwitcher from "./ThemeSwitcher";
import Keypad from "./Keypad";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string | null) {
  if (operand == null) return "";
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(Number(integer));
  return `${INTEGER_FORMATTER.format(Number(integer))}.${decimal}`;
}

export default function CalculatorApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem("calc-theme") || "1");

  const [state, dispatch] = useReducer(reducer, {
    currentOperand: null,
    previousOperand: null,
    operation: null,
  });

  // Tema yönetimi
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("calc-theme", theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--calc-bg-main)] flex items-center justify-center p-6 font-spartan transition-all duration-300">
      <div className="w-full max-w-[540px]">
        
        {/* HEADER: Logo ve Tema Değiştirici */}
        <header className="flex justify-between items-end mb-8 text-[var(--calc-text-main)]">
          <h1 className="text-3xl font-bold lowercase tracking-tight">calc</h1>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </header>

        <div className="bg-[var(--calc-bg-screen)] rounded-xl p-8 mb-6 text-right overflow-hidden min-h-[120px] flex flex-col justify-center gap-2">
          {/* Üst Kısım: Önceki sayı ve operatör */}
          <div className="text-[var(--calc-text-main)] opacity-60 text-lg font-bold min-h-[28px]">
            {formatOperand(state.previousOperand)} {state.operation}
          </div>
          {/* Alt Kısım: Güncel sayı */}
          <div className="text-4xl md:text-5xl font-bold text-[var(--calc-text-main)] truncate">
            {formatOperand(state.currentOperand) || "0"}
          </div>
        </div>

        <Keypad dispatch={dispatch} />
      </div>
    </main>
  );
}