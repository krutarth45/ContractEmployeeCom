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
      if (action.payload.userType === 'contractor') {
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
      } else {
        const {
          companyName,
          companyAddress,
          recruiterName,
          recruiterDesignation,
          companyUrl,
          companyLogoLink
        } = action.payload;
        return {
          ...state,
          companyName,
          companyAddress,
          recruiterName,
          recruiterDesignation,
          companyUrl,
          companyLogoLink
        };
      }
    default:
      return state;
  }
}
