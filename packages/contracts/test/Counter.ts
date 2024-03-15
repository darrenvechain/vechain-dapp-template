import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter };
  }

  describe("Deployment", function () {
    it("Should start at 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.count()).to.equal(0);
    });
  });

  describe("Increment", function () {
    it("Should increment count", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      const tx = await counter.increment();
      await tx.wait();
      expect(await counter.count()).to.equal(1);
    });
  });

  describe("Decrement", function () {
    it("Should fail if count is 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await expect(counter.decrement()).to.be.reverted;
    });

    it("Should decrement count", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      const increment = await counter.increment();
      await increment.wait();
      expect(await counter.count()).to.equal(1);

      const decrement = await counter.decrement();
      await decrement.wait();
      expect(await counter.count()).to.equal(0);
    });
  });
});
