import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Main from './Main';
import FAQ from './FAQ';
import withHeaderFooter from '../HOCs/withHeaderFooter';


const MainPage = withHeaderFooter(Main);
const FAQPage = withHeaderFooter(FAQ);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage}/>
          <Route path="/faq" component={FAQPage}/>
        </div>
      </Router>
    )
  }
}

export default App;