import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Callback } from './pages/Callback'

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Main />
      </Route>
      <Route exact path='/callback'>
        <Callback />
      </Route>
    </Switch>
  );
}

export default App;
