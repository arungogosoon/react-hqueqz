import React, { Component } from 'react';
import { render } from 'react-dom';
import ResponsiveDrawer from './ResponsiveDrawer';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <ResponsiveDrawer theme={{ direction: 'rtl'}} classes={{}} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
