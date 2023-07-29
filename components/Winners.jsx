import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { globalActions } from "@/store/slices"
import { performDraw } from "@/services/web3Client";

const Winners = () => {
  const router = useRouter()
  const [numberOfWinners, setNumberOfWinners] = useState("")
  const dispatch = useDispatch();
  const { winnerModel } = useSelector((state) => state.globalState);
  const { setWinnerModal } = globalActions;
  const { resultId } = router.query;


  const handleSubmit = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await performDraw(resultId, numberOfWinners)
          .then(async () => {
            setNumberOfwinners('')
            dispatch(setWinnerModal(false))
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Draw performed successfully',
        error: 'Encountered error',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center bg-black bg-opacity-50
      transform transition-transform duration-300 ${winnerModel ? 'scale-100' : 'scale-0'}`}
    >
      <div
        className="bg-white shadow-xl shadow-[#0c2856] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Emerging Winners</p>
            <button
              onClick={() => dispatch(setWinnerModal(false))}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl p-2.5 my-5"
          >
            <input
              className="block w-full bg-transparent
              border-0 text-sm text-slate-500 focus:outline-none
              focus:ring-0"
              type="number"
              step={1}
              min={1}
              name="numberOfwinner"
              placeholder="Winners e.g 5"
              onChange={(e) => setNumberOfWinners(e.target.value)}
              value={numberOfWinners}
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md py-2 px-5 rounded-full
              drop-shadow-xl bg-[#0c2856] hover:bg-[#1a396c]"
          >
            Draw Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default Winners