import Head from 'next/head'
import { SubHeader, LotteryTable, Generator } from '@/components'
import { generateLottery, getPurchaseNumbers } from "@/services/dummyData"

const Lottery = ({ lottery, lotteryNumbers, purchasedNumbers }) => {

  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <LotteryTable lottery={lottery} luckyNumbers={lotteryNumbers} purchasedNumbers={purchasedNumbers} />
        <Generator />
      </div>
    </div>
  )
}

export default Lottery

export const getServerSideProps = async (context) => {
  const { lotteryId } = context.query;
  const lottery = generateLottery(lotteryId);
  const purchasedNumbers = getPurchaseNumbers(5);
  const lotteryNumbers = getPurchaseNumbers(5);

  return {
    props: {
      lottery: JSON.parse(JSON.stringify(lottery)),
      lotteryNumbers: JSON.parse(JSON.stringify(lotteryNumbers)),
      purchasedNumbers: JSON.parse(JSON.stringify(purchasedNumbers)),
    },
  }
}