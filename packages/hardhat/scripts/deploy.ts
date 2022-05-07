import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const Backer = await ethers.getContractFactory("Backer");
  const period = 10;
  const backer = await Backer.deploy(period);
  await backer.deployed();

  console.log("Backer deployed to:", backer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
