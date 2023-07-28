import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { globalActions } from "@/store/slices"
import { useDispatch, useSelector } from 'react-redux'
import { exportLuckyNumbers } from "@/services/web3Client"
import { generateLuckyNumbers } from "@/utils/generatorFn"
import { useRouter } from 'next/router'

const Generator = () => {
  const [luckyNumbers, setLuckyNumbers] = useState('')
  const [open, setOpen] = useState(true)
  const router = useRouter();
  const dispatch = useDispatch();
  const { lotteryId } = router.query
  const { generatorModel } = useSelector((state) => state.globalState);
  const { setGeneratorModel } = globalActions;

  const handleSubmit = async (e) => {
    e.preventDefault()
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await exportLuckyNumbers(lotteryId, generateLuckyNumbers(luckyNumbers))
          .then(async () => {
            setLuckyNumbers('')
            dispatch(setGeneratorModel(true))
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Lucky numbers saved to chain',
        error: 'Encountered error',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center bg-black bg-opacity-50
      transform transition-transform duration-300 ${generatorModel ? 'scale-100' : 'scale-0'}`}
    >
      <div
        className="bg-white shadow-xl shadow-[#0c2856] rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Generate Numbers</p>
            <button
              onClick={() => dispatch(setGeneratorModel(false))}
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
              name="luckyNumbers"
              placeholder="Lucky Numbers e.g 19"
              onChange={(e) => setLuckyNumbers(e.target.value)}
              value={luckyNumbers}
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md py-2 px-5 rounded-full
              drop-shadow-xl bg-[#0c2856] hover:bg-[#1a396c]"
          >
            Generate and Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Generator