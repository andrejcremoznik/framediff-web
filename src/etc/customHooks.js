import { useRef, useEffect } from 'react'

export function useEventListener (eventType, handler, options = false, element = window) {
  const internalHandler = useRef()
  useEffect(() => {
    internalHandler.current = handler
  }, [handler])
  useEffect(() => {
    if (!element) return
    const eventListener = event => internalHandler.current(event)
    element.addEventListener(eventType, eventListener, options)
    return () => {
      element.removeEventListener(eventType, eventListener, options)
    }
  }, [eventType, options, element])
}

export default { useEventListener }
