import React, { Component } from 'react';

import Island from './Island';
import Close from './Close';

class DismissableIsland extends Component {
  state = {
    isOpen: true,
  }

  close = () => this.setState({ isOpen: false });

  render() {
    const { children, className } = this.props;
    const { isOpen } = this.state;
    return (isOpen && 
      <Island className={className}>
        <Close onClick={this.close}/>
        {children}
      </Island>
    )
  }
}

export default DismissableIsland;