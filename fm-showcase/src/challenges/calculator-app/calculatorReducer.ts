
// as const' kullanarak tip güvenliğini sağlıyoruz
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
} as const;

//  TİP TANIMLAMALARI
export type State = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite?: boolean;
};

export type Action =
  | { type: typeof ACTIONS.ADD_DIGIT; payload: { digit: string } }
  | { type: typeof ACTIONS.CHOOSE_OPERATION; payload: { operation: string } }
  | { type: typeof ACTIONS.CLEAR }
  | { type: typeof ACTIONS.DELETE_DIGIT }
  | { type: typeof ACTIONS.EVALUATE };

// YARDIMCI HESAPLAMA FONKSİYONU
function evaluate({ currentOperand, previousOperand, operation }: State): string {
  const prev = parseFloat(previousOperand || "");
  const current = parseFloat(currentOperand || "");
  
  if (isNaN(prev) || isNaN(current)) return "";

  let computation = 0;
  switch (operation) {
    case "+": computation = prev + current; break;
    case "-": computation = prev - current; break;
    case "x": computation = prev * current; break;
    case "/": 
      if (current === 0) return "Error";
      computation = prev / current; 
      break;
    default: return "";
  }
  return computation.toString();
}

// ANA REDUCER FONKSİYONU
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload.digit,
          overwrite: false,
        };
      }
      if (action.payload.digit === "0" && state.currentOperand === "0") return state;
      if (action.payload.digit === "." && state.currentOperand?.includes(".")) return state;
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;
      
      if (state.currentOperand == null) {
        return { ...state, operation: action.payload.operation };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return { currentOperand: null, previousOperand: null, operation: null };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return { ...state, overwrite: false, currentOperand: null };
      }
      if (state.currentOperand == null) return state;
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null || 
        state.currentOperand == null || 
        state.previousOperand == null
      ) {
        return state;
      }
      
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}