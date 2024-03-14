import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("TWICE", ["0x00808eB50E96614417C74F1a34007c740c987594"]); 

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
