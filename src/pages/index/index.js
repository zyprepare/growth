import React from 'react';
import ReactDom from 'react-dom';
import { observable, useStrict, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import $ from 'zepto';
useStrict(true);

class MyState {
  @observable num = 0;
  @observable num2 = 0;

  @action addNum = () => {
    this.num++;
  };
  @action addNum2 = () => {
    this.num2++;
  };

  @computed get total() {
    return this.num + this.num2;
  }

  @action getList = () => {
    $.get('/api/posts', function (response) {
      console.log(response);
    })
  }
}

const store = new MyState();
store.getList();

const Total = observer(({store}) => <div>{store.total}</div>);

const Main = observer(({store}) => (
  <div>
    <p>num1: {store.num}</p>
    <p>num1: {store.num2}</p>
    <div>
      <button onClick={store.addNum}>num1 +1</button>
      <button onClick={store.addNum2}>num2 +1</button>
    </div>
  </div>
));

@observer
export default class App extends React.Component {

  render() {
    return (
      <div>
        <Main store={store} />
        <Total store={store} />
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
