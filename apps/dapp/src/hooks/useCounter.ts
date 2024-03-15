import { useConnex } from "@vechain/dapp-kit-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  counterInterface,
  getCounterAbi,
} from "@vechain-dapp-starter/contracts";
import { useSendTransaction } from "./useSendTransaction.ts";

export const useCounter = (counterAddress: string) => {
  const { thor } = useConnex();

  const contract = useMemo(
    () => thor.account(counterAddress),
    [counterAddress, thor],
  );

  const [count, setCount] = useState<number>();

  const clauses = useMemo(() => {
    const clause = {
      to: counterAddress,
      value: 0,
      data: counterInterface.encodeFunctionData("increment"),
      comment: "Increment counter",
    };

    return [clause, clause, clause];
  }, [counterAddress]);

  const { status, send } = useSendTransaction(clauses);

  /**
   * Queries the state of the counter contract every block
   */
  const query = useCallback(async () => {
    while (thor) {
      const result = await contract.method(getCounterAbi("count")).call();
      setCount(result.decoded[0]);

      await thor.ticker().next();
    }
  }, [contract, thor]);

  useEffect(() => {
    query();
  }, []);

  return {
    status,
    count,
    incrementCount: send,
  };
};
