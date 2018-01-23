import React, { Component } from 'react';
import $ from 'zepto';

export default class Welcome extends Component {
  componentDidMount() {
    this.animate(this.logo);
  }

  logo = {};

  animate(dom) {
    setTimeout(() => {
      $(dom).addClass('logo');
    }, 2000);
  }

  render() {
    return (
      <div className="container">
        <h1 ref={(el) => {
          this.logo = el;
        }}
        >
          Welcome!
        </h1>
        <a href="home.html">go home page</a>
      </div>
    );
  }
}
