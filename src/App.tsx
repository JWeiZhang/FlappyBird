import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import routes from './router'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              exact
              path={route.path}
              render={(props: any) => <route.component {...props} />}
            />
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default App
