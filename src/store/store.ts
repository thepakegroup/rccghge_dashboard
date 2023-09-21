import { configureStore } from '@reduxjs/toolkit'
import sideBar from './slice/sidbar'
import buttonVisible from './slice/ButtonVisibility'
import modal from './slice/Modal'
import toast from './slice/toast'

export const store = configureStore({
  reducer: {
    sideBar,
    buttonVisible,
    modal,
    toast,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch