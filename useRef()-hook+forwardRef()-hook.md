# useRef() Hook

### `useRef` is a React Hook that lets you reference a value not required for rendering

```js
const ref = useRef(initialValue)
```

`useRef` returns a **ref object** w. a single property: `ref.current`
- Changing a **`ref`** does not trigger a re-render.
- To update value inside the **`ref`**, you need to manually change its `current` property:

By using a **`ref`**, you ensure that:
 - Information is stored during re-renders (*unlike regular variables, which reset on every render*).
 - Changing it does not trigger a re-render (*unlike state variables, which trigger a re-render*).
 - Information is local to each copy of your component (*unlike variables outside, which are shared*).
 
#### You should not write/ref **`ref.current`** during rendering
<details>
<summary>Show code</summary>

```js
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```
</details>

#### But rather read or write refs from event handlers or effects instead.

<details>
<summary>Show Code</summary>

```js
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
  // ...
}
```
</details>

#### If you have *have* to read/or write something during render - use state.

<hr>

#### Manipulating the DOM with a ref 

```js
import React from "react"; 
 
export default function App() { 
  const formInputRef = React.useRef(null);
 
  const focusInput = () => {
    formInputRef.current.focus();
  }
  return ( 
    <>
      <h1>Using useRef to access underlying DOM</h1>
      <input ref={formInputRef} type="text"></input>
      <button onClick={focusInput}>Focus Input</button>
    </>
  ); 
} 
```

<hr>

# forwardRef() Hook

### `forwardRef` is a React Hook that lets you access another component's DOM nodes

When a **`ref`** is put on a browser element such as `<input />`, the `current` property is set to its corresponding DOM node
- ie the actual <input /> in the browser.
 
However, if you try to put a **`ref`** on your own component, like `<MyInput />`, by default you will get `null`.
🚩 Clicking on the button will **NOT** focus the input:

<details>
<summary>Show Code</summary>

```js
 import { useRef } from 'react';

function MyInput(props) {
  return <input {...props} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
</details>

By default, React intentionally does not allow components to access DOM nodes of other components.
 - Instead, components that want to expose DOM nodes have to **opt in** to that behavior.
 - A component can specify that it “forwards” its ref to one of its children. 

 ✅ Here’s how MyInput can use the **`forwardRef()`** API:

```js
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

<details>
<summary>Show Code</summary>

```js
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
</details>

<hr>

# Best practices for DOM manipulation with refs 

#### Refs are an escape hatch. 
- You should only use them when you have to “step outside React”. 
- Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.
- Forcibly removing DOM nodes will result in the app to crash.
- https://codesandbox.io/s/890j6c?file=/App.js&utm_medium=sandpack
<details>
<summary>Show Code</summary>

```js
import {useState, useRef} from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();    // Uh-oh
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```
</details>





