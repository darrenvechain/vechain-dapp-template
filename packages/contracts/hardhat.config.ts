import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@vechain/sdk-hardhat-plugin";
import { HttpNetworkConfig } from "hardhat/types";

import { VET_DERIVATION_PATH } from "@vechain/sdk-core";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  console.log(await hre.network.provider.request({ method: "eth_accounts" }));
});

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "vechain_solo",
  networks: {
    /**
     * Thor solo network configuration
     */
    vechain_solo: {
      // Thor solo network
      url: "http://localhost:8669",
      accounts: {
        mnemonic:
          "denial kitchen pet squirrel other broom bar gas better priority spoil cross",
        path: VET_DERIVATION_PATH,
        count: 10,
        initialIndex: 1,
        passphrase: "vechainthor",
      },
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1,
      timeout: 20000,
      httpHeaders: {},
    } satisfies HttpNetworkConfig,
  },
};

export default config;
