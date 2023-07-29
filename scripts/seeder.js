const { ethers } = require('hardhat')
const { faker } = require('@faker-js/faker')
const fs = require('fs')
const { shuffleArray, addDays } = require('../utils/generatorFn')

const toWei = (num) => ethers.utils.parseEther(num.toString())

const getParams = () => {
  const imagesUrls = [
    'https://img.icons8.com/external-microdots-premium-microdot-graphic/512/external-lottery-lifestyle-entertainment-vol3-microdots-premium-microdot-graphic.png',
    'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/external-lottery-casino-flaticons-lineal-color-flat-icons-2.png',
    'https://img.icons8.com/emoji/512/crossed-fingers-medium-dark-skin-tone.png',
    'https://img.icons8.com/ios-filled/512/atlantic-lottery-corp.png',
    'https://img.icons8.com/officel/512/win.png',
    'https://img.icons8.com/color/512/lotto.png',
  ]

  const title = faker.random.words(5)
  const description = faker.lorem.paragraph()
  const prize = toWei(faker.finance.amount(8, 16))
  const ticketPrice = toWei(faker.finance.amount(0.01, 0.05))
  const expiresAt = addDays(7)
  const image = shuffleArray(imagesUrls)[0]

  return {
    title,
    description,
    prize,
    ticketPrice,
    expiresAt,
    image,
  }
}

async function main() {
  const servicePercent = 7
  const Contract = await ethers.getContractFactory('LotteryDapp')
  const contract = await Contract.deploy(servicePercent)
  await contract.deployed()

  const iterations = 6
  let tx, result

  const createLotteryFn = async ({ title, description, prize, ticketPrice, expiresAt, image }) => {
    tx = await contract.functions.createLottery(
      title,
      description,
      image,
      prize,
      ticketPrice,
      expiresAt
    )
    await tx.wait()
  }

  for (let i = 0; i < iterations; i++) {
    await createLotteryFn(getParams())
  }

  result = await contract.getLotteries()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./artifacts/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address :- ', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// address :- 0x68B1D87F95878fE05B998F19b66F4baba5De1aed