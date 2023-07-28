import Head from 'next/head'
import { SubHeader, LotteryTable, Generator } from '@/components'
import { generateLottery, getPurchaseNumbers } from "@/services/dummyData"
import { getLottery, getLuckyNumbers } from "@/services/web3";


const Lottery = ({ lottery, luckyNumbers, purchasedNumbers }) => {
  console.log("lucky Numbers :- ", luckyNumbers)
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <LotteryTable lottery={lottery} luckyNumbers={luckyNumbers} purchasedNumbers={purchasedNumbers} />
        <Generator />
      </div>
    </div>
  )
}

export default Lottery

export const getServerSideProps = async (context) => {
  const { lotteryId } = context.query;
  const lottery = await getLottery(lotteryId);
  const purchasedNumbers = getPurchaseNumbers(5);
  const luckyNumbers = await getLuckyNumbers(lotteryId);

  return {
    props: {
      lottery: JSON.parse(JSON.stringify(lottery)),
      luckyNumbers: JSON.parse(JSON.stringify(luckyNumbers)),
      purchasedNumbers: JSON.parse(JSON.stringify(purchasedNumbers)),
    },
  }
}