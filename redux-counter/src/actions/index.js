export const increment = (num) => {
  return {
    type: "INCREMENT", // name
    payload: num       // data
  }
}

export const decrement = () => {
  return {
    type: "DECREMENT"
  }
}