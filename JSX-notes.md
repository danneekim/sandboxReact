# JSX concepts

### `JSX` allows you to write HTML-like elements to create user interfaces via a declarative approach.

![Screen Shot 2023-02-01 at 11 54 20 AM](https://user-images.githubusercontent.com/38666573/216710903-fad3008d-fc29-4381-9ac4-cdc8ce94920f.png)


### What happens under the hood?

![Screen Shot 2023-02-03 at 4 26 59 PM](https://user-images.githubusercontent.com/38666573/216714001-a72da467-1640-4160-96ee-e68439626e02.png)

- React renders components by taking `JSX` and creating a intermediary DOM representation.
- This declarative model is a tree where each node:
  - is a plain object describing a component instance or dom node and its desired properties.
  - `type`: defines type of node such as button.
  - `props`: all properties the component receives.

### Containment v Specialization
![Screen Shot 2023-02-03 at 4 35 51 PM](https://user-images.githubusercontent.com/38666573/216715279-3ce77dc2-47ec-4775-92c3-489942df8a69.png)

- `Containment` refers to the fact that generic components that don't know their children ahead of time. (ie - `Dialog`)
- `Specialization` defines components as being special cases of other components. (ie- `ConfirmationDialog`)

