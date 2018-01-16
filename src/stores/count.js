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
