
# React.memo + useMemo() hook

How re-rendering works with Context in React and using `REACT.memo()` and the `useMemo` hook to improve app performance.

Imagine the following component structure, where the top level component injects a Context provider at the top: 

- `App (ContextProvider) > A > B > C`
```
const App = () => {
return (
   <AppContext.Provider>
     <ComponentA />
   </AppContext.Provider>
 );
};

const ComponentA = () => <ComponentB />;
const ComponentB = () => <ComponentC />;
const ComponentC = () => null;
```

If outermost App component re-renders for whatever reason, 
	`ComponentA`, `ComponentB` and `ComponentC` will re-render as well.

Following this order:  
- `App (ContextProvider) -> A -> B -> C`

If some of your top level components are complex in nature, this could result in some performance hit. To mitigate this issue, you can use `React.memo()`.

### If component renders the same result given the same props, wrapping it in a call to React.memo would boost performance by memoizing the result.

 - `Memoization` - a programming technique that accelerates performance by caching the return values of expensive function calls.

```
const App = () => {
  const value = {a: 'hello', b: 'bye'};
  return (
    <AppContext.Provider value={value}>
      <ComponentA />
    </AppContext.Provider>
  );
};

const ComponentA = React.memo(() => <ComponentB />);
const ComponentB = () => <ComponentC />;
const ComponentC = () => {
  const contextValue = useContext(AppContext); *** rerenders on value prop change
  return null;
};
```
- `App (ContextProvider) -> C`
### According to React context rules, all consumers that are descendants of a provider will re-render whenever provider’s value prop changes.

#### For example, if value props of the provider changes from:
- `{a: ‘hello’, b: ‘bye’}` --> `{a: 'hi', b: 'bye'}`
- The rerender sequence would be: `App (ContextProvider) -> C`

#### BUT, imagine IF the App component re-renders but the provider values don’t change:
- `{a: 'hi', b: 'bye'} --> {a: 'hi', b: 'bye'}`

#### The `App (ContextProvider) -> C` would again rerender... 
- Since object comparison in JS are done by reference.
- `{a: ‘hi’, b: ‘bye’} !== {a: ‘hi’, b: ‘bye’}`

#### In order to resolve this issue - we can use the `useMemo` hook as follows:
```
const App = () => {
  const a = 'hi';
  const b = 'bye';
  const value = useMemo(() => ({a, b}), [a, b]); *** useMemo hook

  return (
    <AppContext.Provider value={value}>
      <ComponentA />
    </AppContext.Provider>
  );
};

const ComponentA = React.memo(() => <ComponentB />);
const ComponentB = () => <ComponentC />;
const ComponentC = () => {
  const contextValue = useContext(AppContext);
  return null;
};
```

#### With the above implementation, if App re-renders but values of `a` or `b` remain the same.
   - Only the `App (ContextProvider)` would re-render.
