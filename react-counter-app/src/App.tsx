import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
export default class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  // place to initialize state
  constructor(props: any) {
    super(props);
    console.log("App - Constructor", this.props);
  }

  componentDidMount() {
    // place to make Ajax Call to server
    console.log("App - Mounted");
  }
  // IMPORTANT: component that owns the state - should be the one to modify it.
  // SINGLE SOURCE OF TRUTH (state mgmt)
  // never update state directly
  handleIncrement = (counterId: number) => {
    const counters = [...this.state.counters];
    counters.map((c) => {
      if (c.id === counterId) c.value++;
    });
    this.setState({ counters: counters });
  };

  handleDecrement = (counterId: number) => {
    const counters = [...this.state.counters];
    counters.map((c) => {
      if (c.id === counterId) c.value--;
    });
    this.setState({ counters: counters });
  };

  handleDelete = (counterId: number) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters: counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: counters });
  };

  render() {
    console.log("App - Rendered");
    return (
      <div>
        <NavBar totalCounters={this.state.counters.length}></NavBar>
        <main className="container">
          <Counters
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
            counters={this.state.counters}
          ></Counters>
        </main>
      </div>
    );
  }
}
