import { nanoid } from 'nanoid/non-secure'
import { randomColor } from '../etc/utils'

export const objects = {
  get () {
    const localObjects = JSON.parse(window.localStorage.getItem('objects'))
    return Array.isArray(localObjects)
      ? localObjects.map(object => [...object, nanoid(), randomColor()])
      : []
  },
  set (payload) {
    const cleanPayload = payload.map(object => object.slice(0, 3))
    window.localStorage.setItem('objects', JSON.stringify(cleanPayload))
    return cleanPayload
  }
}

export default { objects }
