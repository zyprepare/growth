import React, {Component} from 'react';
import ReactDom from 'react-dom';
import observer from 'mobx-react';
import Store from '../../stores/index.js';
const store = new Store();

@observer
export default class Count extends Component {
  render () {
    return (
      <div>
        <p>{store.number}</p>
        <button onClick={store.add}>add</button>
      </div>
    );
  }
}
