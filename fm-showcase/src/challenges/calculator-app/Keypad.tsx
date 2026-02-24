import { ACTIONS } from "./calculatorReducer";

interface KeypadProps {
  dispatch: React.Dispatch<any>;
}

export default function Keypad({ dispatch }: KeypadProps) {
  const keys = [
    { label: "7", type: "num" }, { label: "8", type: "num" }, { label: "9", type: "num" }, { label: "DEL", type: "del" },
    { label: "4", type: "num" }, { label: "5", type: "num" }, { label: "6", type: "num" }, { label: "+", type: "op" },
    { label: "1", type: "num" }, { label: "2", type: "num" }, { label: "3", type: "num" }, { label: "-", type: "op" },
    { label: ".", type: "num" }, { label: "0", type: "num" }, { label: "/", type: "op" }, { label: "x", type: "op" },
  ];

  const handleKeyClick = (key: { label: string; type: string }) => {
    switch (key.type) {
      case "num":
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key.label } });
        break;
      case "op":
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: key.label } });
        break;
      case "del":
        dispatch({ type: ACTIONS.DELETE_DIGIT });
        break;
    }
  };

  return (
    <div className="bg-[var(--calc-bg-keypad)] rounded-xl p-6 md:p-8 grid grid-cols-4 gap-3 md:gap-6 shadow-sm">
      {/* Standart Tuşlar: 7, 8, 9, DEL vb. */}
      {keys.map((key) => (
        <button
          key={key.label}
          onClick={() => handleKeyClick(key)}
          className={`
            h-16 rounded-lg text-32px font-bold transition-all border-b-4 active:translate-y-1 active:border-b-0
            ${key.type === 'num' || key.type === 'op'
              ? 'bg-[var(--calc-key-bg-primary)] text-[var(--calc-text-keys)] border-[var(--calc-key-shadow-primary)] hover:brightness-150' 
              : 'bg-[var(--calc-key-bg-secondary)] text-white text-xl border-[var(--calc-key-shadow-secondary)] hover:brightness-125'}
          `}
        >
          {key.label}
        </button>
      ))}

      {/* Alt Sıradaki Geniş Tuşlar */}
      <button 
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        className="col-span-2 h-16 rounded-lg text-xl font-bold bg-[var(--calc-key-bg-secondary)] text-white border-b-4 border-[var(--calc-key-shadow-secondary)] hover:brightness-125 uppercase active:translate-y-1 active:border-b-0"
      >
        Reset
      </button>
      
      <button 
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        className="col-span-2 h-16 rounded-lg text-xl font-bold bg-[var(--calc-key-bg-accent)] text-[var(--calc-text-accent)] border-b-4 border-[var(--calc-key-shadow-accent)] hover:brightness-125 active:translate-y-1 active:border-b-0"
      >
        =
      </button>
    </div>
  );
}