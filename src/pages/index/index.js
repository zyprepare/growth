import React from 'react';
import ReactDom from 'react-dom';
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true);

class MyState {
  @observable num = 0;
  @action addNum = () => {
    this.num++;
  };
}

const newState = new MyState();

@observer
export default class App extends React.Component {

  render() {
    return (
      <div>
        <p>{newState.num}</p>
        <button onClick={newState.addNum}>+1</button>
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
