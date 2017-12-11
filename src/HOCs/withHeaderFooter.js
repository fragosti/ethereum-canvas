import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default (Component) => (
  class extends React.Component {
    render() {
      window.ga && window.ga('set', 'page', window.location.href.slice(window.location.origin.length));
      window.ga && window.ga('send', 'pageview')
      return (
        <div>
          <Header/>
          <Component {...this.props}/>
          <Footer/>
        </div>
      )
    }
  }
)