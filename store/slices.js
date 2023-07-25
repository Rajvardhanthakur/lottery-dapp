import { createSlice } from '@reduxjs/toolkit'
import { actions } from './actions/action'
import { states } from './states/state'

export const globalSlice = createSlice({
  name: 'global',
  initialState: states,
  reducers: actions,
})

export const globalActions = globalSlice.actions
export default globalSlice.reducer