import React from 'react'
import Head from 'next/head'
import { SubHeader, ResultTable } from "@/components"
import { generateLottery, generateLotteryParticipants } from "@/services/dummyData"

const Result = ({ lottery, participantList, lotteryResult }) => {
  return (
    <div>
      <Head>
        <title>Dapp Lottery | Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <ResultTable lottery={lottery} participants={participantList} result={lotteryResult} />
      </div>
    </div>
  )
}

export default Result

export const getServerSideProps = async (context) => {
  const { resultId } = context.query;
  const lottery = generateLottery(resultId);
  const participantList = generateLotteryParticipants(6);
  const lotteryResult = []

  return {
    props: {
      lottery: JSON.parse(JSON.stringify(lottery)),
      participantList: JSON.parse(JSON.stringify(participantList)),
      lotteryResult: JSON.parse(JSON.stringify(lotteryResult))
    }
  }
}