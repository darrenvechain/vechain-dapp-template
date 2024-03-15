import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { WalletButton, useWallet } from "@vechain/dapp-kit-react";
import "./App.css";
import { useDeployCounter } from "./hooks/useDeployCounter.ts";
import { TxStatus } from "./components/TxStatus.tsx";
import { Counter } from "./components/Counter.tsx";
import { getDeployedCounter } from "@vechain-dapp-starter/contracts";
import { useMemo } from "react";

const existingCounter = getDeployedCounter();

function App() {
  const { account } = useWallet();
  const { counterAddress, deploy, status } = useDeployCounter();

  const contractAddress = useMemo(() => {
    if (existingCounter?.address) {
      return existingCounter.address;
    }

    return counterAddress;
  }, [counterAddress]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <WalletButton />

        {!contractAddress ? (
          <>
            <button disabled={!account} onClick={deploy}>
              Deploy Counter
            </button>
            {status && <TxStatus status={status} />}
          </>
        ) : (
          <Counter counterAddress={contractAddress} />
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
