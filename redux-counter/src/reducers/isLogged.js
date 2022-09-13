const isLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return !state; // true
    default:
      return state;
  }
};
export default isLoggedReducer;