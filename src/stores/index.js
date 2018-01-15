import {observable, autorun, computed, action} from 'mobx';

// const value = observable(0);
// const number = observable(100);

// const plus = computed(() => number.get() > 0);

// autorun(() => {
//   console.log(value.get());
//   console.log(plus.get());
// });

// value.set(0);
// number.set(-200);
// number.set(20);

export default class Store {
  @observable number = 0;
  @observable list = [];

  @action add = () => {
    ths.number++;
  }
}
