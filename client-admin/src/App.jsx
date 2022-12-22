import React from 'react'
import { Switch } from 'react-router-dom'
import renderRoutes from './utils/render-routes'
import routes from './routes';
import './reset.css'
import './App.less'
function App() {
  return (
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  );
}

export default App;
