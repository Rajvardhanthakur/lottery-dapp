import store from "@/store";
import { ethers } from "ethers";
import { globalActions } from "@/store/slices";
import address from "@/artifacts/contractAddress.json";
import abi from "@/artifacts/contracts/LotteryDapp.sol/LotteryDapp.json"
import { formatDate } from "@/utils/helper"

const { updateWallet } = globalActions;
const contractAddress = address.address;
const contractAbi = abi.abi;
let tx, ethereum;

if (typeof window !== 'undefined') {
  ethereum = window.ethereum;
}

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError("Before Proceeding Please Install Metamask");
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    store.dispatch(updateWallet(accounts[0]))
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async (CometChat) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      window.location.reload()
    })

    if (accounts.length) {
      store.dispatch(updateWallet(accounts[0]))
    } else {
      store.dispatch(updateWallet(''))
      notifyUser('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getEtheriumContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  const wallet = ethers.Wallet.createRandom()
  const signer = provider.getSigner(wallet.address)
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const getLotteries = async () => {
  const lotteries = await (await getEtheriumContract()).functions.getLotteries()
  console.log("Lotteries in web3 :- ", lotteries)
  return structureLotteries(lotteries[0]);
}

const getLottery = async (id) => {
  const lottery = await (await getEtheriumContract()).functions.getLottery(id)
  return structureLotteries([lottery[0]])[0]
}

const structureLotteries = (lotteries) =>
  lotteries.map((lottery) => {
    console.log('Lottery struct :- ', lottery.owner)
    return {
      id: Number(lottery.id),
      title: lottery.title,
      description: lottery.description,
      owner: lottery.owner.toLowerCase(),
      prize: fromWei(lottery.prize),
      ticketPrice: fromWei(lottery.ticketPrice),
      image: lottery.image,
      createdAt: formatDate(Number(lottery.createdAt + '000')),
      drawsAt: formatDate(Number(lottery.expiresAt)),
      expiresAt: Number(lottery.expiresAt),
      participants: Number(lottery.participants),
      drawn: lottery.drawn,
    }
  })


const reportError = (error) => {
  console.error(error)
}

const notifyUser = (message) => {
  console.log(message)
}

export { connectWallet, isWallectConnected, getLotteries, getLottery }