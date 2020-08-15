import React, { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { objectsService } from './app/feathers'
import { StateContext, DispatchContext, initialState, reducer } from './app/context'
import { theme as themeStorage, objects as objectsStorage } from './app/storage'
import { decorateObjectData } from './etc/utils'
import Home from './pages/home/Home'
import Objects from './pages/objects/Objects'
import NotFound from './pages/notfound/NotFound'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default function App () {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    async function bootstrap () {
      // Set theme
      dispatch({
        type: 'setTheme',
        payload: themeStorage.get()
      })
      // Set custom objects from localStorage
      dispatch({
        type: 'setLocalObjects',
        payload: objectsStorage.get().map(decorateObjectData)
      })
      // Get global objects
      try {
        const globalObjects = await objectsService.find({ paginate: false })
        dispatch({
          type: 'setGlobalObjects',
          payload: globalObjects.data.map(({ width, height, title }) => decorateObjectData([width, height, title]))
        })
      } catch (err) {
        console.error(`API error: ${err.message}`)
      }
      // Ready
      dispatch({ type: 'setReady' })
    }
    bootstrap()
  }, [dispatch])

  useEffect(() => {
    if (state.isReady) {
      document.body.classList.remove('dark', 'light')
      document.body.classList.add(state.theme)
      themeStorage.set(state.theme)
    }
  }, [state.theme, state.isReady])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {state.isReady && (
          <Router>
            <Header className='container' />
            <main className='main container'>
              <Switch>
                <Route path='/objects'><Objects /></Route>
                <Route path='/' exact><Home /></Route>
                <Route path='*'><NotFound /></Route>
              </Switch>
            </main>
            <Footer className='container f--s t--center' />
          </Router>
        )}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
