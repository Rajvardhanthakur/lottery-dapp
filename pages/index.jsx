import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {
  Header,
  Lotteries
} from "@/components"
import { getLotteries } from "@/services/web3"

export default function Home({ lotteries }) {
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
  const data = await getLotteries();
  return {
    props: {
      lotteries: JSON.parse(JSON.stringify(data)),
    }
  }
}
