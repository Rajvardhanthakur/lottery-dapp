import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import LCalc from "../assets/l-calc.png"
import { connectWallet } from "@/services/web3"
import { addressTruncate } from "@/utils/helper";

const Header = () => {

  const { wallet } = useSelector((state) => state.globalState)

  console.log("wallet :- ", wallet)

  const handleConnectWallet = () => {
    console.log("connect wallet")
    connectWallet()
  }

  return (
    <div
      className="px-5 md:px-40"
      style={{ backgroundColor: "#2779a7" }}
    >
      <div className="flex items-center justify-between text-white py-5">
        <div>
          <h1 className="text-xl font-bold">DappLottery</h1>
        </div>

        <div className="hidden lg:flex items-center space-x-3 font-semibold">
          <p>Home</p>
          <p>How To Play</p>
          <p>All Lottery</p>
          <p>Contact</p>
        </div>

        {
          wallet ? (
            <button className='flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500 hover:bg-rose-600 cursor-pointer font-semibold text-sm'>
              {addressTruncate(wallet, 4, 4, 11)}
            </button>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
            hover:bg-rose-600 cursor-pointer font-semibold text-sm"
            >
              Connect Wallet
            </button>)
        }
      </div>

      <div className="flex items-center justify-between pb-5">
        <div>
          <div className="text-white py-5">
            <h2 className="text-4xl font-bold py-4 ">
              Take the chance to <br /> change your life
            </h2>

            <p className="text-xl">
              We bring a persolan and effective to every project we work on. <br />
              Which is why our client love why they keep coming back.
            </p>
          </div>
        </div>
        <div className="py-5 hidden sm:block">
          <Image src={LCalc} alt="network" className="rounded-lg w-80" />
        </div>
      </div>

      <div className="pb-10">
        <Link
          href={'/create'}
          className="bg-amber-500 hover:bg-rose-600 text-white rounded-md
        cursor-pointer font-semibold py-3 px-5"
        >
          Create Jackpot
        </Link>
      </div>
    </div>
  )
}

export default Header