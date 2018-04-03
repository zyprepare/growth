import React from 'react';
import { observer, inject } from 'mobx-react';
import Proptypes from 'prop-types';
import Count from '../../components/count';
import Store from '../../stores/count';

@inject('store')
@observer
export default class App extends React.Component {
  componentDidMount() {
    this.props.store.getData();
  }

  render() {
    return (
      <div>
        <Count store={this.props.store} />
        <p>异步请求数据：{this.props.store.data.length}</p>
        {this.props.store.data.map(value => (
          <div key={value.id}>{value.id} {value.title} {value.author}</div>
        ))}
      </div>
    );
  }
}

App.propTypes = {
  store: Proptypes.instanceOf(Store), // eslint-disable-line react/require-default-props
};
