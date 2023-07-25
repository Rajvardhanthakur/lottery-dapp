import { configureStore } from "@reduxjs/toolkit"
import { globalSlice } from "./slices"


const store = configureStore({
  reducer: {
    globalState: globalSlice
  }
})

export default store;