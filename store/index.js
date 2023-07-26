import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./slices"


const store = configureStore({
  reducer: {
    globalState: globalReducer
  }
})

export default store;