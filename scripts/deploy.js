const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  

  const CreateBurger = await hre.ethers.getContractFactory("CreateBurger");
  const createBurger = await CreateBurger.deploy();
  await createBurger.deployed();
  console.log("CreateBurger deployed to:", createBurger.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
