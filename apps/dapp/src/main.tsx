/// <reference types="@vechain/connex" />
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DAppKitProvider } from "@vechain/dapp-kit-react";
import "./index.css";

fetch('http://localhost:8669/blocks/0').then(async (res) => {
  const genesis = await res.json()


  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <DAppKitProvider
        nodeUrl={"http://localhost:8669"}
        genesis={genesis}
        usePersistence={true}
      >
        <App />
      </DAppKitProvider>
    </React.StrictMode>,
  );

})

