import React from 'react';
import Count from '../../components/count';
import Store from '../../stores/count';

const store = new Store();

export default function () {
  return (
    <div>
      <Count store={store} />
    </div>
  );
}
