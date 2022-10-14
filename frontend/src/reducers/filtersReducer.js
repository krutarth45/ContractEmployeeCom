const initialState = {};
export function filtersReducer(state = initialState, action) {
  switch (action.payload) {
    case 'GETFILTERS':
      return state;
    default:
      return state;
  }
}
