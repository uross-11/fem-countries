const reducer = (state, action) => {
  if (action.type === 'SET_MODE') {
    return {
      darkMode: !state.darkMode,
    }
  }
  throw new Error ('no matching action type');
}

export default reducer;