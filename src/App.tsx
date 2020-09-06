import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Rutas from './component/maps/rutas';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact={true} component={Rutas} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
