import { useMediaQuery } from 'react-responsive';
import EmployerDetails from '../../components/Employer/EmployerDetails';
import EmployerHeader from '../../components/Employer/EmployerHeader';

const CompanyDetails = () => {
  const medium = useMediaQuery({
    query: '(max-width: 768px)'
  });
  return (
    <div>
      <EmployerHeader />
      <EmployerDetails />
      {medium && <div style={{ height: '50px' }}></div>}
    </div>
  );
};

export default CompanyDetails;
