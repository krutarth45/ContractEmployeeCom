import EmployerHeader from '../../components/Employer/EmployerHeader';
import PostedJobsList from '../../components/Employer/PostedJobsList';

const PostedJobs = () => {
  return (
    <div>
      <EmployerHeader />
      <PostedJobsList />
      <div style={{ height: '50px' }}></div>
    </div>
  );
};

export default PostedJobs;
