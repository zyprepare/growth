import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import App from './app';
import store from '../../stores/count';

ReactDom.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
);
