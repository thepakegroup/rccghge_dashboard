import { configureStore } from '@reduxjs/toolkit'
import sideBar from './slice/sidbar'
import buttonVisible from './slice/ButtonVisibility'
import modal from './slice/Modal'
import toast from './slice/toast'
import mediaItems from './slice/mediaItems'
import testimony from './slice/testimony'
import content from './slice/content'
import service from './slice/service'

export const store = configureStore({
  reducer: {
    sideBar,
    buttonVisible,
    modal,
    toast,
    mediaItems,
    testimony,
    content,
    service
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch