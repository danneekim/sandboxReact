# React.cloneElement() & React.children.map()

`React.cloneElement` and `React.Children.map()` are top-level APIs useful in:
* modifying children properties
* add to children properties
* dynamically manipulating child properties
  - *In React, `props` are immutable objects and require being copied before modifying* 

## React.cloneElement(`element`, `[props]`)
- `React.cloneElement()` returns a copy of the provided `element` w. modified `props`.


## React.Children.map(`children`, `callback`)
- `React.Children.map` iterates over child elements and invokes a `callback` for each element.
  - `children`: collection of elements
  - `callback`: (`child`, `index`) => `{ ... }`

<details>
<summary>Example1: Modify button props - disabled</summary>
<br>

```js
const buttonElement = {
  type: SubmitButton,
  props: {
    color: 'green',
    children: 'Submit',
  },
};

const output = React.cloneElement(buttonElement, {disable: false})

//{ type: SubmitButton, props: { color: "green", children: "Submit", disabled: false }}
```
</details>

<details>
<summary>Example2: Add '32px' left margin for each child </summary>
<br>

```js
import React from "react";

const Row = ({ children, spacing }) => {
  const childStyle = {
    marginLeft: `${spacing}px`,
  };

  return (
    <div className="Row">
      {React.Children.map(children, (child, idx) => { 
        return React.cloneElement(child, {
          style: {
            ...child.props.style,                           
            ...(idx > 0 ? childStyle : 0),
          },
        });
      })}
    </div>
  );
};

const LiveOrder = () => {
  return (
    <div className="App">
      <Row spacing={32}>
        <p>Pizza Margarita</p>
        <p>2</p>
        <p>30$</p>
        <p>18:30</p>
        <p>John</p>
      </Row>
    </div>
  );
};

export default LiveOrder;
```
</details>

<details>
<summary>Example3: Create a radio group component</summary>
<br>

```js
import { useState } from "react";


const RadioGroup = ({ onChange, selected, children }) => {
  // Use React.Children.map and React.cloneElement to clone children
  // and pass props { onChange, checked } to each child RadioOption
  const RadioOptions = React.Children.map(children, (child, idx) => {
    return React.cloneElement(child, {
      onChange,
      checked: child.props.value === selected
    });
  });
  
  return <div className="RadioGroup">{RadioOptions}</div>;
};

const RadioOption = ({ value, checked, onChange, children }) => {
  // Hook up onChange handler to call onChange prop passed to RadioGroup
  // Sets value of radio input to selected value
  return (
    <div className="RadioOption">
      <input id={value}
        type="radio"
        name={value}
        value={value}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <label htmlFor={value}>{children}</label>
    </div>
  );
  };

function App() {
  const [selected, setSelected] = useState("");
  return (
    <div className="App">
      <h2>How did you hear about Little Lemon?</h2>
      <RadioGroup onChange={setSelected} selected={selected}>
        <RadioOption value="social_media">Social Media</RadioOption>
        <RadioOption value="friends">Friends</RadioOption>
        <RadioOption value="advertising">Advertising</RadioOption>
        <RadioOption value="other">Other</RadioOption>
      </RadioGroup>
      <button disabled={!selected}>Submit</button>
    </div>
  );
}

export default App;
```
</details>
