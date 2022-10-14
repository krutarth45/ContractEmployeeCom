const initialState = {};
export function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GETJOBS':
      return action.payload;
    default:
      return state;
  }
}
