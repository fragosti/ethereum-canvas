import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Main from './Main';
import withHeaderFooter from '../HOCs/withHeaderFooter';


const MainPage = withHeaderFooter(Main);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage}/>
        </div>
      </Router>
    )
  }
}

export default App;