import React, { Component } from 'react';
import Counter from './counter';

export default class Counters extends Component {

  state = {}

  render() {
    return <div>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
    </div>;
  }
}
