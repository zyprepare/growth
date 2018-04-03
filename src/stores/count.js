import { observable, useStrict, computed, action, runInAction } from 'mobx';
// import $ from 'zepto';
import 'whatwg-fetch';

useStrict(true);

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

class Count {
  @observable num = 0;
  @observable num2 = 0;
  @observable data = [];

  @action addNum = () => {
    this.num++;
  };

  @action addNum2 = () => {
    this.num2++;
  };

  @computed get total() {
    return this.num + this.num2;
  }

  @action getData = async () => {
    try {
      let res = await fetch('/api/posts');

      res = await res.json();

      runInAction('get data', () => {
        this.data = res;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Count();
