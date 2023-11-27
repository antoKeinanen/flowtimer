import { TimerMode } from "../types/mode";

interface ControlsProps {
  onBreak: () => void;
  onContinue: () => void;
  mode: TimerMode;
}

function Controls({ onBreak, onContinue, mode }: ControlsProps) {
  return (
    <div className="flex p-2 mt-2">
      {mode == TimerMode.COUNTUP ? (
        <button
          className="border border-stone-100 rounded-md py-2 font-bold w-full text-stone-100 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-150"
          onClick={onBreak}
        >
          Break
        </button>
      ) : (
        <button
          className="border border-stone-100 rounded-md py-2 font-bold w-full text-stone-100 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-150"
          onClick={onContinue}
        >
          Continue
        </button>
      )}
    </div>
  );
}

export default Controls;
