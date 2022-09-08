const { describe, it } = require("node:test")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          let mockV3Aggregator
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          describe("constructor", async function () {
              it("sets the aggregator addresses correctly", async function () {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          // describe("fund", async function () {
          //     // https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
          //     // could also do assert.fail
          //     it("Fails if you don't send enough ETH", async function () {
          //         await expect(fundMe.fund()).to.be.revertedWith(
          //             "You need to spend more ETH!"
          //         )
          //     })
          //     it("updates amount fundeed data srtucture", async function () {
          //         await fundMe.func({ value: sendValue })
          //         const response = await fundMe.addressToAmountFunded(deployer)

          //         assert.equal(reponse.toString(), sendValue.toString())
          //     })
          //     it("add funder to array of founders", async function () {
          //         await fundMe.fund({ value: sendValue })
          //         const funder = await fundMe.funder(0)
          //         assert.equal(funder, deployer)
          //     })
          // })
          // describe("withdraw", async function () {
          //     beforeEach(async function () {
          //         await fundMe.fund({ value: sendValue })
          //     })

          //     it("withdraw ETH from a single funder", async function () {
          //         const startingFundMeBalance = await fundMe.provider.getBalance(
          //             fundMe.address
          //         )
          //         const startingDeployerBalance = await fundMe.provider.getBalance(
          //             deployer
          //         )
          //         const transactionResponse = await fundMe.withdraw()
          //         const transactionReceipt = await transactionResponse.wait(1)
          //         const endingFundeMeBalance = await fundMe.provider.getBalance(
          //             fundMe.address
          //         )
          //         const endingDeployerBalance = await fundMe.provider.getBalance(
          //             deployer
          //         )

          //         assert.equal(endingFundeMeBalance, 0)
          //         assert.equal(
          //             startingFundMeBalance.add(startingDeployerBalance).toString(),
          //             endingDeployerBalance.add(gasCost).toString()
          //         )
          //     })
          // })
      })
