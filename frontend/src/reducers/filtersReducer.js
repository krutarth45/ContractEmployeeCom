const initialState = {
  jobTitleFilter: '',
  skillsFilter: [],
  industryFilter: [],
  contractDurationFilter: [],
  filteredJobs: [],
  allJobs: []
};
export function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'GETFILTERS':
      return {
        ...state,
        filteredJobs: action.payload,
        allJobs: action.payload
      };
    case 'UPDATEFILTERS':
      const { jobTitle, skills, industry, contractDuration } = action.payload;
      return {
        ...state,
        jobTitleFilter: jobTitle,
        skillsFilter: skills,
        industryFilter: industry,
        contractDurationFilter: contractDuration
      };
    default:
      return state;
  }
}
