export const actions = {
  updateWallet: (state, action) => {
    state.wallet = action.payload
  },
  setLotteries: (state, action) => {
    state.lotteries = action.payload
  },
  setGeneratorModel: (state, action) => {
    state.generatorModel = action.payload
  },
  setWinnterModel: (state, action) => {
    state.winnerModel = action.payload
  },
  setLuckyNumbers: (state, action) => {
    state.luckyNumbers = action.payload
  },
  setLottery: (state, action) => {
    state.lottery = action.payload
  },
  setLuckyNumbers: (state, action) => {
    state.luckyNumbers = action.payload
  },
  setPurchasedNumbers: (state, action) => {
    state.purchasedNumbers = action.payload
  },
  setParticipants: (state, action) => {
    state.participants = action.payload
  },

}