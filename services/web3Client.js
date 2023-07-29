import store from "@/store";
import { ethers } from "ethers";
import { globalActions } from "@/store/slices";
import address from "@/artifacts/contractAddress.json";
import abi from "@/artifacts/contracts/LotteryDapp.sol/LotteryDapp.json"
import { getLuckyNumbers, getPurchasedNumbers, getLottery, getLotteryResult, getParticipants } from "./web3"

const {
  setLuckyNumbers,
  setLottery,
  setPurchasedNumbers,
  setResult,
  setParticipants
} = globalActions


const contractAddress = address.address
const contractAbi = abi.abi
let tx, ethereum

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

const toWei = (num) => ethers.utils.parseEther(num.toString())


const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const createLotteryFn = async ({ title, description, imageUrl, prize, ticketPrice, expiresAt }) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.createLottery(
      title,
      description,
      imageUrl,
      toWei(prize),
      toWei(ticketPrice),
      expiresAt,
      {
        from: connectedAccount,
      }
    )
    await tx.wait()
  } catch (error) {
    reportError(error)
  }
}

const exportLuckyNumbers = async (id, luckyNumbers) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.getLuckyNumbers(id, luckyNumbers, {
      from: connectedAccount,
    })
    await tx.wait()
    const lotteryNumbers = await getLuckyNumbers(id)
    store.dispatch(setLuckyNumbers(lotteryNumbers))
  } catch (error) {
    reportError(error)
  }
}

const buyTicket = async (id, luckyNumberId, ticketPrice) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.buyTicket(id, luckyNumberId, {
      from: connectedAccount,
      value: toWei(ticketPrice),
    })
    await tx.wait()
    const purchasedNumbers = await getPurchasedNumbers(id)
    const lottery = await getLottery(id)
    const lotteryLuckyNumbers = await getLuckyNumbers(id)

    store.dispatch(setPurchasedNumbers(purchasedNumbers))
    store.dispatch(setLuckyNumbers(lotteryLuckyNumbers))
    store.dispatch(setLottery(lottery))
  } catch (error) {
    reportError(error)
  }
}

const performDraw = async (id, numOfWinners) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.randomlySelectWinners(id, numOfWinners, {
      from: connectedAccount,
    })
    await tx.wait()
    const lotteryParticipants = await getParticipants(id)
    const lottery = await getLottery(id)
    const result = await getLotteryResult(id)

    store.dispatch(setParticipants(lotteryParticipants))
    store.dispatch(setLottery(lottery))
    store.dispatch(setResult(result))
  } catch (error) {
    reportError(error)
  }
}


const reportError = (error) => {
  console.error(error)
}

const notifyUser = (message) => {
  console.log(message)
}

export { getEthereumContract, createLotteryFn, exportLuckyNumbers, buyTicket, performDraw }