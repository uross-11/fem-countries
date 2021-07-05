const reducer = (state, action) => {
  if (action.type === 'SET_MODE') {
    return {
      /* ...state, */
      darkMode: !state.darkMode,
    }
  }
  throw new Error ('no matching action type');
}

export default reducer;