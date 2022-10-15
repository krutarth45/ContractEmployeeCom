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
      console.log(contractDuration);
      let tempJobs = state.allJobs.filter((job) => {
        let skillCount = 0;
        let jobSkillsCurrent = job.jobSkills;
        jobSkillsCurrent.forEach((element) => {
          if (skills.includes(element)) {
            skillCount = skillCount + 1;
          }
        });
        return skillCount === skills.length;
      });
      tempJobs = tempJobs.filter((str) => {
        return str.jobRole.toLowerCase().includes(jobTitle.toLowerCase());
      });
      tempJobs = tempJobs.filter((element) => {
        if (contractDuration.length === 0) {
          return true;
        } else {
          if (contractDuration.includes(element.jobContractDuration[0])) {
            return true;
          } else {
            return false;
          }
        }
      });
      tempJobs = tempJobs.filter((element) => {
        if (industry.length === 0) {
          return true;
        } else {
          if (industry.includes(element.jobIndustry[0])) {
            return true;
          } else {
            return false;
          }
        }
      });
      return {
        ...state,
        jobTitleFilter: jobTitle,
        skillsFilter: skills,
        industryFilter: industry,
        contractDurationFilter: contractDuration,
        filteredJobs: tempJobs
      };
    default:
      return state;
  }
}
