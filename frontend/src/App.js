import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loans } from './reducers/loans'
import { Main } from './pages/Main'
import { Callback } from './pages/Callback'
import { ConnectBank } from './pages/ConnectBank'

const reducer = combineReducers({
  loans: loans.reducer
})

const store = configureStore({ reducer })

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/callback'>
          <Callback />
        </Route>
        <Route exact path='/connect'>
          <ConnectBank />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
