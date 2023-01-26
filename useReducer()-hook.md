# useReducer() Hook

### The **useReducer()** hook is a built-in React hook best suited to manage complex state logic.
```js
import { React, useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === 'buy_ingredients') return { money: state.money - 10 };
  if (action.type === 'sell_a_meal') return { money: state.money + 10 };
  if (action.type === 'celebrity_visit') return { money: state.money + 5000 };
  return state;
}

function App() {
  const initialState = { money: 100 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>Wallet: {state.money}</h1>
      <div>
        <button onClick={() => dispatch({type: 'buy_ingredients'})}>Shopping for ingredients</button>
        <button onClick={() => dispatch({type: 'sell_a_meal'})}>Serve a meal to a customer</button>
        <button onClick={() => dispatch({type: 'celebrity_visit'})}>Serve a meal to a celebrity</button>
      </div>
    </div>
  );
}

export default App;
```
<hr>

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
#### `useReducer()` accepts:
1. `reducer` of type `(state, action) => newState`
2. `initial arguments` *aka initialState*
3. `init` (*optional*) allows for lazy initialization of state
  - Allowing for initial state to be calculated outside the **`reducer`** via `init(initialArg)`; convenient for resetting state.
<details>
    <summary>Example of lazy initialization</summary>
    
```js
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
</details>

#### `useReducer()` returns `[state, dispatch]` which are the current state and a dispatch method:
- `dispatch` is used to update state by calling a certain action - `({type: 'increment'})`
  - Passing down `dispatch` (*instead of callbacks*) can optimize performance that trigger deep updates.
  - As React guarantees `dispatch` function identity to be stable and doesn't change on re-renders.
  - Although React bails out of rendering the children/effects, the specific component may still re-render before bailing out.
  
<details>
    <summary>Example of passing down dispatch</summary>

    ```js
    const TodosDispatch = React.createContext(null);
    
    function TodosApp() {
    // Note: `dispatch` won't change between re-renders
    const [todos, dispatch] = useReducer(todosReducer);
    
    return (
      <TodosDispatch.Provider value={dispatch}>
        <DeepTree todos={todos} />
      </TodosDispatch.Provider>
      );
    }
    ```  
</details>

<hr>

#### `useReducer()` vs `useState()`:
Although there's no clearcut rule for which hook to use to manage state, but `useState` can become difficult to maintain as state becomes more complex.

- Therefore, `useState()` is best used to handle primitive data types, such as **strings, numbers, or booleans**.
  - A simple toggle button, to keep track of whether the button is on or off.
  - A current score component to keep track of user's score.
- While `useReducer()` is best used to handle more complex logic/data, such as **arrays or objects**.
  - A form w. multiple input fields to keep track of all fields at once and overall form state.
  - A paginated list component to keep track of the current page, sorting, filtering, and the overall state of the list.


