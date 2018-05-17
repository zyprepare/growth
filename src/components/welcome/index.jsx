import React, { Component } from 'react';
import $ from 'zepto';
import './index.scss';

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
        <a href="home.html" className="text-primary">go home page</a>
      </div>
    );
  }
}
