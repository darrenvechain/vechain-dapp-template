import { useCallback, useMemo, useState } from "react";
import { CounterFactory } from "@vechain-dapp-starter/contracts";
import { useSendTransaction } from "./useSendTransaction";

export const useDeployCounter = () => {
  const [counterAddress, setCounterAddress] = useState<string | undefined>();

  const clauses = useMemo(() => {
    return [
      {
        to: null,
        value: 0,
        data: CounterFactory.bytecode,
        comment: "Deploy Counter Contract",
      },
    ];
  }, []);

  const { status, send } = useSendTransaction(clauses);

  const deploy = useCallback(async () => {
    const receipt = await send();

    if (!receipt?.outputs[0].contractAddress) {
      console.error("No contract address in receipt");
      return;
    }

    setCounterAddress(receipt.outputs[0].contractAddress);
  }, [send]);

  return {
    status,
    counterAddress,
    deploy,
  };
};
