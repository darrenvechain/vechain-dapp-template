import { Counter__factory as CounterFactory } from "../typechain-types";
import contracts from "../output/contracts.json";
import { DeployedContract } from "./types";

const CounterContractName = "Counter";

const counterInterface = CounterFactory.createInterface();

type CounterMethodKey = Parameters<typeof counterInterface.getFunction>[0];

const getCounterAbi = (key: CounterMethodKey) => {
  return JSON.parse(counterInterface.getFunction(key).format("json"));
};

const getDeployedCounter = (): DeployedContract | undefined => {
  return contracts.find((c) => c.name === CounterContractName);
};

export {
  getCounterAbi,
  counterInterface,
  CounterFactory,
  getDeployedCounter,
  CounterContractName,
};
