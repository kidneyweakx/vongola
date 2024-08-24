import { task } from "hardhat/config"
import { readFileSync, writeFileSync } from "../helpers/pathHelper"
task("deploy:contract", "Deploy contract")
  .addParam("contract")
  .setAction(async ({ contract }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory(contract)
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy()
    console.log(`TestToken.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "mainContract.json", addressData)

    await deployContract.deployed()
  },
  )

task("deploy:token", "Deploy contract")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory("TestStableCoin")
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy(signer.address)
    console.log(`TestStableCoin.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "TestStableCoin.json", addressData)

    await deployContract.deployed()

    if (verify) {
      console.log("verifying contract...")
      await deployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: deployContract.address,
          constructorArguments: [signer.address],
          contract: "contracts/TestStableCoin.sol:TestStableCoin",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )

task("deploy:vote", "Deploy contract")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory("GrpVote")
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy()
    console.log(`GrpVote.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "GrpVote.json", addressData)

    await deployContract.deployed()

    if (verify) {
      console.log("verifying contract...")
      await deployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: deployContract.address,
          constructorArguments: [],
          contract: "contracts/GrpVote.sol:GrpVote",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )
