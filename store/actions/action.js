export const actions = {
  updateWallet: (state, action) => {
    state.wallet = action.payload
  },
  setJackpots: (state, action) => {
    state.jackpots = action.payload
  },
}