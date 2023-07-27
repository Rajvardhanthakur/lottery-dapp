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
  }
}