# Updating state in React

### Updating the state object in React based on user-generated events.

```js
import { useState } from "react"; 
 
export default function App() { 
  const [greeting, setGreeting] = useState({ greet: "Hello, World" }); 
  console.log(greeting, setGreeting); 
 
  function updateGreeting() { 
    const newGreeting = {...greeting}; 
    newGreeting.greet = "Hello, World-Wide Web"; 
    setGreeting(newGreeting); 
  } 
 
  return ( 
    <div> 
      <h1>{greeting.greet}</h1> 
      <button onClick={updateGreeting}>Update greeting</button> 
    </div> 
  ); 
} 
```
The suggested approach to update state objects in React when using `useState` is by:
- copying the state object (via spread operator `...`)
- updating the copied object
- setting the state to *new copied object*


### Updating the state object using arrow functions

```js
import { useState } from "react"; 
 
export default function App() { 
  const [greeting, setGreeting] = useState( 
    { 
        greet: "Hello", 
        place: "World" 
    } 
  ); 
  console.log(greeting, setGreeting); 
 
  function updateGreeting() { 
    setGreeting(prevState => { 
        return {...prevState, place: "World-Wide Web"} 
    }); 
  } 
 
  return ( 
    <div> 
      <h1>{greeting.greet}, {greeting.place}</h1> 
      <button onClick={updateGreeting}>Update greeting</button> 
    </div> 
  ); 
} 
```

This example demonstrates how to handle when a specific property of the state object changes, while keep the remaining properties unchanged.

The reason this works is because it uses the previous state which is named `prevState`.
- This is the previous value of the `greeting` variable. 
In other words, it makes a copy of the `prevState` object.
- Then updates only the *place* property on the copied object.
- Then returns a brand-new object (*wrapped in { }*)
```js
return {...prevState, place: "World-Wide Web"} 
```
- And finally returned to `setGreeting` call
