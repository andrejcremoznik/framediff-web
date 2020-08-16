import { createContext } from 'react'

export const StateContext = createContext()
export const DispatchContext = createContext()

export const initialState = {
  theme: 'dark',
  localObjects: [],
  globalObjects: []
}

export function reducer (draft, { type, payload }) {
  switch (type) {
    case 'setTheme':
      draft.theme = payload
      break
    case 'setLocalObjects':
      draft.localObjects = payload
      break
    case 'addLocalObject':
      draft.localObjects.push(payload)
      break
    case 'removeLocalObject':
      draft.localObjects = draft.localObjects.filter(o => o[3] !== payload)
      break
    case 'setGlobalObjects':
      draft.globalObjects = payload
      break
    default:
  }
}

export default { StateContext, DispatchContext, initialState, reducer }
