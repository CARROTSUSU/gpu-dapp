const hre = require("hardhat");

async function main() {
  const GPUSim = await hre.ethers.getContractFactory("GPUSim");
  const gpuSim = await GPUSim.deploy();

  await gpuSim.deployed();

  console.log("GPUSim deployed to:", gpuSim.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
