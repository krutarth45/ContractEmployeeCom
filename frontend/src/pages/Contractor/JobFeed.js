import ContractorHeader from '../../components/Contractor/ContractorHeader/ContractorHeader';
import JobDisplay from '../../components/Contractor/JobDisplay';

const JobFeed = () => {
  return (
    <div>
      <ContractorHeader />
      <JobDisplay />
      <div style={{ height: '50px' }}></div>
    </div>
  );
};

export default JobFeed;
