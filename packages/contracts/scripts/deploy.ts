import { ethers, vechainProvider } from "hardhat";
import { Counter__factory } from "../typechain-types";
import * as fs from "fs";
import * as path from "path";
import { DeployedContract } from "../src/types";
import { CounterContractName } from "../src";

const writeInspectorJson = (contracts: DeployedContract[]) => {
  // if the inspector directory doesn't exist, create it
  if (!fs.existsSync(path.join(__dirname, "..", "output"))) {
    fs.mkdirSync(path.join(__dirname, "..", "output"));
  }

  const _path = path.join(__dirname, "..", "output", "contracts.json");

  fs.writeFileSync(_path, JSON.stringify(contracts, null, 2));
};

async function main() {
  if (!vechainProvider) {
    throw new Error("This script must be run on a vechain network");
  }

  const CountFactory = await ethers.getContractFactory("Counter");

  const contract = await CountFactory.deploy();

  // TODO: This is a bug with the SDK, it has a bug
  const txReceipt = await contract.deploymentTransaction()?.wait();
  const address = txReceipt?.logs[0].address as string;
  console.log("Contract deployed to:", address);

  const genesisBlock = await vechainProvider.request({
    method: "eth_getBlockByNumber",
    params: ["0", true],
  });

  writeInspectorJson([
    {
      name: CounterContractName,
      address: address,
      abi: Counter__factory.abi,
      genesisId: (genesisBlock as any).hash as string,
    },
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
