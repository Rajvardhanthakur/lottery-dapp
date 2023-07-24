import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'
import { CountDown } from './'

const LotteryTable = ({ lottery, luckyNumbers, purchasedNumbers }) => {

  const handleGenerateLottery = () => {

  }

  const handlePurchase = (i) => {
    console.log(i)
  }

  return (
    <div className="py-10 px-5 bg-slate-100">
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h4 className="text-4xl text-slate-700 text-center font-bold pb-3">
          Buy Lottery Tickets Online
        </h4>
        <p className="text-lg text-gray-600 font-semibold capitalize">{lottery?.title}</p>
        <p className="text-sm text-gray-500 w-full sm:w-2/3">{lottery?.description}</p>
        <p className="text-sm font-medium text-black w-full sm:w-2/3">
          {lottery?.participants} participants
        </p>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4 mb-6">
        {lottery?.expiresAt ? <CountDown timestamp={lottery?.expiresAt} /> : null}

        <div className="flex justify-center items-center space-x-2">
          <button
            disabled={Date.now() > lottery?.expiresAt}
            onClick={handleGenerateLottery}
            className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
            hover:bg-rose-600 font-semibold"
          >
            Generate Lucky Numbers
          </button>

          <Link
            href={`/results/` + lottery?.id}
            className="flex flex-nowrap border py-2 px-4 rounded-full bg-[#0c2856]
            hover:bg-[#1a396c] cursor-pointer font-semibold text-white"
          >
            Draw Result
          </Link>
        </div>
      </div>

      <div className="bg-white text-sm overflow-x-auto flex flex-col w-full sm:w-3/4 mx-auto p-5 rounded-md">
        <div className="pb-4 text-center">
          <p className="semibold text-2xl">Select Your winning Lottery Numbers</p>
        </div>

        <table className="table-auto">
          <thead className="max-h-80 overflow-y-auto block">
            <tr className="flex justify-between text-left">
              <th className="px-4 py-2 ">#</th>
              <th className="px-4 py-2 ">Ticket Price</th>
              <th className="px-4 py-2 ">Draw Date</th>
              <th className="px-4 py-2 ">Ticket Number</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody className="max-h-80 overflow-y-auto block">
            {luckyNumbers?.map((luckyNumber, i) => (
              <tr className="flex justify-between border-b text-left" key={i}>
                <td className="px-4 py-2 font-semibold">{i + 1}</td>
                <td className="px-4 py-2 font-semibold">
                  <div className="flex justify-center items-center space-x-1">
                    <FaEthereum />
                    <span>{lottery?.ticketPrice}</span>
                  </div>
                </td>
                <td className="px-4 py-2 font-semibold">{lottery?.drawsAt}</td>
                <td className="px-4 py-2 font-semibold">{luckyNumber}</td>
                <td className="px-4 py-2 font-semibold">
                  <button
                    onClick={() => handlePurchase(i)}
                    className={`bg-black
                      text-white text-sm py-2 px-4 rounded-full`}
                  >
                    BUY NOW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LotteryTable