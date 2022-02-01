import React, { Component } from 'react';
import Counter from './counter';

export default class Counters extends Component {

  state = {
    counters: [
      {id: 1, value: 4 },
      {id: 2, value: 0 },
      {id: 3, value: 0 },
      {id: 4, value: 0 }
    ]
  }

  // IMPORTANT: component that owns the state - should be the one to modify it.
  // SINGLE SOURCE OF TRUTH (state mgmt)
    // never update state directly
  handleIncrement = (counterId: number) => {
    const counters = [...this.state.counters];
    counters.map((c) => {
      if(c.id === counterId) c.value++;
    });
    this.setState({ counters: counters });
  };

  handleDelete = (counterId: number) => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({counters: counters});
  }

  handleReset = () => {
    const counters = this.state.counters.map((c => {
      c.value = 0;
      return c;
    }))
    this.setState({counters: counters});
  }


  render() {
    return <div>
      {this.state.counters.map( (counter) => 
        <Counter key={counter.id} counter={counter} onIncrement={this.handleIncrement} onDelete={this.handleDelete}>
        {/* // <Counter key={counter.id} id={counter.id} value={counter.value}> */}
          <h4>Counter #{counter.id}</h4>
        </Counter>
      )}
    </div>;
  }
}
