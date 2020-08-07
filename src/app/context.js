import { createContext } from 'react'

export const StateContext = createContext()
export const DispatchContext = createContext()

export const initialState = {
  isReady: false,
  localObjects: [],
  objectsBeingCompared: []
}

export function reducer (draft, { type, payload }) {
  switch (type) {
    case 'setReady':
      draft.isReady = true
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
    case 'addToComparison':
      draft.objectsBeingCompared.push(payload)
      break
    default:
  }
}

export default { StateContext, DispatchContext, initialState, reducer }
