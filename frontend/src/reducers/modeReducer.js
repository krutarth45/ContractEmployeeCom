import Cookies from 'js-cookie';

export function modeReducer(
  state = Cookies.get('mode') ? JSON.parse(Cookies.get('mode')) : true,
  action
) {
  switch (action.type) {
    case 'CONTRACTOR':
      return true;
    case 'EMPLOYER':
      return false;
    default:
      return state;
  }
}
