import { TxStatus as Status } from "../types/transactions.ts";
import { useMemo } from "react";

export const TxStatus = ({ status }: { status: Status }) => {
  const statusColor = useMemo(() => {
    switch (status) {
      case undefined:
        return "white";
      case "Waiting for wallet":
      case "Pending Transaction":
        return "orange";
      case "Error (See Console)":
        return "red";
      case "Transaction Success":
        return "green";
    }
  }, [status]);

  return <p style={{ color: statusColor }}>{status}</p>;
};
