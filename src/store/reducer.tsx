const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'RADIO_EXPAND': {
      return state.includes(action.key)
        ? state.filter((key) => action.key.length !== key.length)
        : state.filter((key) => action.key.length !== key.length).concat([action.key]);
    }
    case 'CHECKBOX_EXPAND': {
      return state.includes(action.key) ? state.filter((key) => action.key !== key) : state.concat([action.key]);
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
