import Link from 'next/link'

const SubHeader = () => {
  const handleConnectWallet = () => {
    console.log("handle Connect Wallet")
  }
  return (
    <div
      style={{ backgroundColor: "#2779a7" }}
      className="flex items-center justify-between text-white px-10 py-5"
    >
      <div>
        <Link href="/" className="text-xl font-bold">
          DappLottery
        </Link>
      </div>

      <div className="hidden lg:flex items-center space-x-6 font-semibold">
        <p>Home</p>
        <p>How To Play</p>
        <p>All Lottery</p>
        <p>Contact</p>
      </div>

      <button
        onClick={handleConnectWallet}
        className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
          hover:bg-rose-600 cursor-pointer font-semibold text-sm"
      >
        Connect Wallet
      </button>
    </div>
  )
}

export default SubHeader