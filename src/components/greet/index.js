import React, { Component } from 'react';
import './index.css';
import $ from 'zepto';

export default class Greet extends Component {
  logo = {};

  componentDidMount() {
    this.animate(this.logo);
  }

  animate(dom) {
    setTimeout(() => {
      $(dom).addClass('logo');
    }, 2000);
  }

  render() {
    return (
      <div className="container">
        <h1 ref={(el) => {this.logo = el}}>Welcome!</h1>
        <a href="home.html">go home page</a>
      </div>
    )
  }
}
