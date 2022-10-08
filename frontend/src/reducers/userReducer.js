import Cookies from 'js-cookie';

export function userReducer(
  state = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  action
) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'UPDATE':
      const {
        totalExpYear,
        relExpYear,
        skillInfo,
        companyName,
        jobType,
        curMonSal,
        curMonCurr,
        expMonSal,
        expMonCurr,
        noticePeriod,
        currentCity,
        preferredCities,
        bday,
        resumeLink
      } = action.payload;
      return {
        ...state,
        totalExpYear,
        relExpYear,
        skillInfo,
        companyName,
        jobType,
        curMonSal,
        curMonCurr,
        expMonSal,
        expMonCurr,
        noticePeriod,
        currentCity,
        preferredCities,
        bday,
        resumeLink
      };
    default:
      return state;
  }
}
