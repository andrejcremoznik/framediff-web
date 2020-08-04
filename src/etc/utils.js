import { nanoid } from 'nanoid/non-secure'

export function domId (length = 6) {
  return `_${nanoid(length)}`
}

export function sleep (timeout = 100) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export function makeClassNameDecorator (classPrefix) {
  return (modsArray = [], extraClass = '') =>
    modsArray.reduce((acc, cur) =>
      `${acc} ${classPrefix}--${cur}`, `${extraClass} ${classPrefix}`.trim())
}

export default { domId, sleep, makeClassNameDecorator }
