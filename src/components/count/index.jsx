import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const Total = observer(({ store }) => <div>总数：{ store.total }</div>);

const Main = observer(({ store }) => (
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
export default class Count extends Component {
  static componentWillReact() {
    console.log('render');
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps);
  }
  componentWillUpdate(nextProps) {
    console.log('nextProps ', nextProps);
  }
  render() {
    return (
      <div>
        <Main store={this.props.store} />
        <Total store={this.props.store} />
      </div>
    );
  }
}

Count.propTypes = {
  store: PropTypes.object.isRequired,
};
