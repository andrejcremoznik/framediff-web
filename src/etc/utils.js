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

export function randomColor () {
  return `hsla(${Math.floor(Math.random() * 360)}, 100%, ${Math.floor(Math.random() * 50) + 25}%, 1)`
}

export default {
  domId,
  sleep,
  makeClassNameDecorator,
  randomColor
}
