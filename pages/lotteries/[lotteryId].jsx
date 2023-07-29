import Head from 'next/head'
import { SubHeader, LotteryTable, Generator } from '@/components'
import { getLottery, getLuckyNumbers, getPurchasedNumbers } from "@/services/web3";
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from "@/store/slices"
import { useEffect } from 'react';


const Lottery = ({ lotteryServer, luckyNumbersServer, purchasedNumbersServer }) => {
  const dispatch = useDispatch();
  const { luckyNumbers, purchasedNumbers, lottery, wallet } = useSelector((state) => state.globalState);
  const { setLuckyNumbers, setPurchasedNumbers, setLottery } = globalActions

  useEffect(() => {
    dispatch(setLottery(lotteryServer))
    dispatch(setLuckyNumbers(luckyNumbersServer))
    dispatch(setPurchasedNumbers(purchasedNumbersServer))
  }, [])

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
  const purchasedNumbers = await getPurchasedNumbers(lotteryId);
  const luckyNumbers = await getLuckyNumbers(lotteryId);

  return {
    props: {
      lotteryServer: JSON.parse(JSON.stringify(lottery)),
      luckyNumbersServer: JSON.parse(JSON.stringify(luckyNumbers)),
      purchasedNumbersServer: JSON.parse(JSON.stringify(purchasedNumbers)),
    },
  }
}