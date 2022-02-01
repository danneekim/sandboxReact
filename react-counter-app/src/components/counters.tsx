import React, { Component } from "react";
import Counter from "./counter";

export default class Counters extends Component<any, any> {
  render() {
    //obj destructuring
    const { onReset, onIncrement, onDelete, counters } = this.props;

    return (
      <div>
        <button onClick={onReset} className="btn btn-primary m-2">
          Reset
        </button>
        {counters.map((counter: any) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDelete={onDelete}
          >
            <h4>Counter #{counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
    // return (
    //   <div>
    //     <button onClick={this.props.onReset} className="btn btn-primary m-2">
    //       Reset
    //     </button>
    //     {this.props.counters.map((counter: any) => (
    //       <Counter
    //         key={counter.id}
    //         counter={counter}
    //         onIncrement={this.props.onIncrement}
    //         onDelete={this.props.onDelete}
    //       >
    //         <h4>Counter #{counter.id}</h4>
    //       </Counter>
    //     ))}
    //   </div>
    // );
  }
}
