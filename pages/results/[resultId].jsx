import React, { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { SubHeader, ResultTable, Winners } from "@/components"
import { getLottery, getParticipants, getLotteryResult } from "@/services/web3"
import { toast } from 'react-toastify'
import { globalActions } from "@/store/slices"

const Result = ({ lotterySsr, participantList, lotteryResult }) => {
  const { participants, lottery, result } = useSelector((state) => state.globalState)
  const { setParticipants, setLottery, setResult } = globalActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setResult(lotteryResult))
    dispatch(setLottery(lotterySsr))
    dispatch(setParticipants(participantList))
  }, [])

  return (
    <div>
      <Head>
        <title>Dapp Lottery | Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <ResultTable lottery={lottery} participants={participants} result={result} />
        <Winners />
      </div>
    </div>
  )
}

export default Result

export const getServerSideProps = async (context) => {
  const { resultId } = context.query;
  const lottery = await getLottery(resultId);
  const participantList = await getParticipants(resultId);
  const lotteryResult = await getLotteryResult(resultId)

  return {
    props: {
      lotterySsr: JSON.parse(JSON.stringify(lottery)),
      participantList: JSON.parse(JSON.stringify(participantList)),
      lotteryResult: JSON.parse(JSON.stringify(lotteryResult))
    }
  }
}