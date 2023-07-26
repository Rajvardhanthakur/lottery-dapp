import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {
  Header,
  Lotteries
} from "@/components"
import { generateLotteries } from "@/services/dummyData"
import { getLotteries } from "@/services/web3"

export default function Home({ lotteries, lotteriesW }) {
  console.log("Lotteries W :- ", lotteriesW)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <Lotteries lotteries={lotteries} />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = generateLotteries(8)
  const lotteriesData = getLotteries();
  return {
    props: {
      lotteries: JSON.parse(JSON.stringify(data)),
      lotteriesW: JSON.parse(JSON.stringify(lotteriesData))
    }
  }
}
