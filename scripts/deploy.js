// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployedContract = await hre.ethers.deployContract("TransactionStorage");
  await deployedContract.waitForDeployment();

  console.log(
    `Contract deployed at ${deployedContract.target}`
  );
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${deployedContract.target}"
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// const hre = require("hardhat");

// async function main() {
//     const deployedContract = await hre.ethers.deployContract("NEXGOVToken");
//     await deployedContract.waitForDeployment();
//     console.log(
//         `contract deployed to https://explorer.public.zkevm-test.net/address/${deployedContract.target}`
//     );
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });