import { useState } from "react";
import { TxStatus } from "../types/transactions.ts";
import { useConnex } from "@vechain/dapp-kit-react";

export const useSendTransaction = (clauses: Connex.Vendor.TxMessage) => {
  const connex = useConnex();
  const [status, setStatus] = useState<TxStatus | undefined>();

  const send = async () => {
    setStatus(undefined);

    try {
      const tx = connex.vendor.sign("tx", clauses).request();

      setStatus("Waiting for wallet");

      const res = await tx;
      console.log(res);

      setStatus("Pending Transaction");

      await connex.thor.ticker().next();

      const receipt = await connex.thor.transaction(res.txid).getReceipt();

      if (!receipt || receipt.reverted) {
        throw new Error("Transaction reverted");
      }

      setStatus("Transaction Success");
      return receipt;
    } catch (error) {
      console.error(error);
      setStatus("Error (See Console)");
    }
  };

  return { status, send };
};
