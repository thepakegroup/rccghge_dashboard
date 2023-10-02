import { configureStore } from '@reduxjs/toolkit'
import sideBar from './slice/sidbar'
import buttonVisible from './slice/ButtonVisibility'
import modal from './slice/Modal'
import toast from './slice/toast'
import mediaItems from './slice/mediaItems'
import testimony from './slice/testimony'
import content from './slice/content'
import service from './slice/service'
import leader from './slice/leader'
import churchGroup from './slice/churchGroup'
import mission from './slice/mission'

export const store = configureStore({
  reducer: {
    sideBar,
    buttonVisible,
    modal,
    toast,
    mediaItems,
    testimony,
    content,
    service,
    leader,
    churchGroup,
    mission
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch