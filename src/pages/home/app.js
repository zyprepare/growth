import React, { Component } from 'react';
import Count from '../../components/Count';
import Store from '../../stores/count';

const store = new Store();

export default class App extends Component {
  render() {
    return (
      <div>
        <Count store={store} />
      </div>
    )
  }
}
