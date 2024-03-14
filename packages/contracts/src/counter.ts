import { Counter__factory as CounterFactory } from "../typechain-types";

const counterInterface = CounterFactory.createInterface();

type CounterMethodKey = Parameters<typeof counterInterface.getFunction>[0];

const getCounterAbi = (key: CounterMethodKey) => {
  return JSON.parse(counterInterface.getFunction(key).format("json"));
};

export { getCounterAbi, counterInterface, CounterFactory };
