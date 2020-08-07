import React, { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import client from './app/feathers'
import { StateContext, DispatchContext, initialState, reducer } from './app/context'
import { objects as objectsLocalStorage } from './app/storage'
import Home from './pages/home/Home'
import Objects from './pages/objects/Objects'
import NotFound from './pages/notfound/NotFound'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default function App () {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    async function bootstrap () {
      // Set custom objects from localStorage
      dispatch({ type: 'setLocalObjects', payload: objectsLocalStorage.get() })
      // Ready
      dispatch({ type: 'setReady' })
    }
    bootstrap()
  }, [dispatch])

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
