import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import routes from './router'
import './App.css'

function App() {
  console.log(process.env.PUBLIC_URL)
  return (
    <div className="App">
      <Router basename={'/FlappyBird'}>
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
