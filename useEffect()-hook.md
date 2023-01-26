# useEffect() Hook

### The **useEffect()** hook is a built-in React hook best suited to perform *side effects* in React components.
```js
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [day, setDay] = useState("Monday");
  const prevDay = usePrevious(day);
  const getNextDay = () => {
    if (day === "Monday") {
      setDay("Tuesday")
    } else if (day === "Tuesday") {
      setDay("Wednesday")
    } else if (day === "Wednesday") {
      setDay("Thursday")
    } else if (day === "Thursday") {
      setDay("Friday")
    } else if (day === "Friday") {
      setDay("Monday")
    }
  }
  return (
    <div style={{padding: "40px"}}>
      <h1>
        Today is: {day}<br />
        {
          prevDay && (
            <span>Previous work day was: {prevDay}</span>
          )
        }
      </h1>
      <button onClick={getNextDay}>
        Get next day
      </button>
    </div>
  );
}

function usePrevious(val) { // returns previous work day
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  }, [val])
  return ref.current;
}
```

- The `useEffect()` hook always runs after the component mounts (ie - after React updates the DOM)


#### By default, if no second argument is provided to the useEffect function, the effect will run after every render.
```js
useEffect(() => { 
   document.title = 'Little Lemon';
 }); 
```

#### An array `[]` as a second parameter can be passed to avoid applying an effect to run after each render.

```js
useEffect(() => { 
  document.title = `Little Lemon, v${version}`;
}, [version]); // Only re-run the effect if version changes 
```
- This effect only re-runs if the version number changes between renders.
- <details>
  <summary>More details</summary>
  - If version is 2 and the component re-renders and version still equals 2.<br>
  - React compares [2] from the previous render and [2] from the next render.<br>
  - Since all items inside the array are the same, React would skip running the effect.
  </details>


#### Using multiple Effects to Separate Concerns
```js
function MenuPage(props) { 
  const [data, setData] = useState([]); 

  useEffect(() => { 
    document.title = 'Little Lemon'; 
  }, []); 

  useEffect(() => { 
    fetch(`https://littlelemon/menu/${id}`) 
      .then(response => response.json()) 
      .then(json => setData(json)); 
  }, [props.id]); 

  // ... 
} 
```
- There are no limits to how many effects a component can have.
- Multiple hooks allows grouping of related logic and improves code readability + modularity.

#### Effects with Cleanup

There are some side effects that require clean up of resources and/or memory to avoid memory leaks, such as fetching data from an external source. 
* To clean up effects, you can return a function from the `useEffect` hook which gets called:
  * when the component unmounts
  * or when dependencies of the effect change
* This function cancels any ongoing network requests or clears any state set during the effect.

```js
import { useState, useEffect } from 'react';
import axios from 'axios';

function ExampleComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancel;
    axios({
      method: 'get',
      url: 'https://my-api.com/data',
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      setData(response.data);
    });

    return () => cancel();
  }, []);

  return data ? <div>{data}</div> : <div>Loading...</div>;
}
```
#### In this example, the useEffect hook makes a `GET` request to the URL 'https://my-api.com/data' using the Axios library. 
1. The request is made with a cancel token (*Axios feature that allows requests to be cancelled*)
2. The hook returns a function which calls the cancel function; canceling the request if the component is unmounted. 
3. This is important because if the component is unmounted while the request is still pending, it can cause memory leaks or other issues.

<details>
<summary>Another Example</summary>
<br>
Here is an example of the useEffect hook to fetching data from an API, and cleaning up the effect when the component unmounts:

```js
import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch('https://my-api.com/data')
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setData(data);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render the component
}
```
- In this example, the effect is only run once, when the component mounts, because the `[]` dependency array is empty. 
- The return function within the useEffect is called when the component unmounts, it set isMounted to false which means that setData and setError will not be called anymore.
</details>

<details>
<summary>Async/Await Example </summary>
<br>
Here is an example of the useEffect hook to using `async/await` to render a simple dropdown of users.

```js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    async function startFetching() {
      setBio(null);
      const result = await fetchBio(person);
      if (!ignore) {
        setBio(result);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```
- https://codesandbox.io/s/m0odyk?file=/App.js&utm_medium=sandpack
</details>

<hr>

# Custom Hooks

You can create custom hooks using `useEffect()` to reliably streamline a reusable a piece of functionality in your React apps.

```js
function useConsoleLog(varName) {
  useEffect(() => {
    console.log(varName);
  }, [varName]);
}

export default useConsoleLog;
```
A custom hook can be created by creating a seperate file at the root of the `src` folder (ie `useConsoleLog.js`),
- Which can be imported and used to `console.log(variables)` through the application.

```js
import { useState } from "react";
import useConsoleLog from "./useConsoleLog";

function App() {
  const [count, setCount] = useState(0);
  useConsoleLog(count);                // logs count to console

  function increment() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Plus 1</button>
    </div>
  );
}

export default App;
```
