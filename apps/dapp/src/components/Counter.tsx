import { useCounter } from "../hooks/useCounter.ts";
import { TxStatus } from "./TxStatus.tsx";
import "../App.css";

export const Counter = ({ counterAddress }: { counterAddress: string }) => {
  const { incrementCount, count, status } = useCounter(counterAddress);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
      {status && <TxStatus status={status} />}
    </div>
  );
};
