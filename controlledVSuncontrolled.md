
# Controlled components vs. Uncontrolled components

Advantages of controlled vs uncontrolled inputs via state design.

### Uncontrolled Inputs
Uncontrolled inputs are like standard HTML form inputs:
```js
const Form = () => { 
 return ( 
   <div> 
     <input type="text" /> 
   </div> 
 ); 
};
```
- They remember exactly what is typed, being the DOM itself that maintains that internal state.
- In order to access their values, you use React ref.
```js
const Form = () => { 
 const inputRef = useRef(null); 

 const handleSubmit = () => { 
   const inputValue = inputRef.current.value; 
   // Do something with the value 
 } 
 return ( 
   <form onSubmit={handleSubmit}> 
     <input ref={inputRef} type="text" /> 
   </form> 
 ); 
}; 
```
### Controlled Inputs

Controlled inputs accept their current value as a prop and a callback to change the value. 
- Implying the input value(s) exists somewhere in the React state somewhere.
- Typically, the component that renders the input (_like a form component_) saves it in its state:

```js
const Form = () => { 
 const [value, setValue] = useState(""); 

 const handleChange = (e) => { 
   setValue(e.target.value) 
 } 

 return ( 
   <form> 
     <input 
       value={value} 
       onChange={handleChange} 
       type="text" 
     /> 
   </form> 
 ); 
}; 
```

- Every time a new character is typed, the `handleChange` function is executed.
- It receives the new input value, and then it sets it in the state.

### This flow pushes the value changes to the form component instead of pulling like the ref example from the uncontrolled version. 

#### Therefore, the Form component always has the input's current value without needing to ask for it explicitly. 
- As a result, your data (React state) and UI (input tags) are always in sync.
- Allowing for forms to respond immediately and to perform:
    - Instant validation per field 
    - Disabling submit button unless all fields are valid
    - Enforcing a specific input format, like email, phone, or credit card numbers

<details>
    <summary>Click for Code reference</summary>
 
```js
import { useState } from "react";
import { validateEmail } from "./utils";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    // validates entire form
    if (
      firstName.length &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      role !== 'role' ) return true;
    return false;
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false
    });
    setRole("role");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Account created!");
    clearForm();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              placeholder="First name" />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              placeholder="Last name"/>
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="Email address" />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              value={password.value}
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value})
              }}
              onBlur={(e) => {
                setPassword({ ...password, isTouched: true})
              }}
              placeholder="Password" />
            {password.isTouched && password.value.length < 8 ? <PasswordErrorMessage/> : null}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => {setRole(e.target.value)}}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}
```
</details>
