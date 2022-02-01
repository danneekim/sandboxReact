import React, { Component } from "react";

export default class Counter extends Component<any, any> {
  componentDidUpdate(prevProps: any, prevState: any) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      // AJAX call and get new data from server
    }
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
    // perform clean up of timers or listeners
    // prior to component is removed from DOM
  }

  render() {
    console.log("Counter - Rendered");

    return (
      <div>
        {/* <h4>Counter #{this.props.counter.id}</h4> */}
        {/* {this.props.children}  */}
        {/* passing children - ie dialog boxes/modals */}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter.id)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-sm btn-danger m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 ";
    classes += this.props.counter.value === 0 ? "bg-warning" : "bg-primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}
