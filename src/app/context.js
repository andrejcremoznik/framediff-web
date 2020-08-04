import { createContext } from 'react'

export const StateContext = createContext()
export const DispatchContext = createContext()

export const initialState = {
  isReady: false
}

export function reducer (draft, { type, payload }) {
  switch (type) {
    case 'setReady':
      draft.isReady = true
      break
    default: // eslint-disable-next-line
      return
  }
}

export default { StateContext, DispatchContext, initialState, reducer }
