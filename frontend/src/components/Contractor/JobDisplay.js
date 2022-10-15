import { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../functions/contractor';
import '../Contractor/ContractorDetails/ContractorDetails.css';
import { jobIndustries, skills, contractDuration } from '../../data';
import SingleJob from './SingleJob';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useRef } from 'react';
const JobDisplay = () => {
  const { user, filters } = useSelector((state) => ({ ...state }));
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [industryFilter, setIndustryFilter] = useState([]);
  const [contractDurationFilter, setContractDurationFilter] = useState([]);
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(async () => {
    const result = await getJobs(user.token);
    if (result === 'No Jobs Posted.') {
      return setData(result);
    }
    setData(result);
    dispatch({ type: 'GETJOBS', payload: result });
    dispatch({ type: 'GETFILTERS', payload: result });
  }, []);
  return (
    <div>
      <div className="d-md-flex">
        <div className="mx-auto jobDisplayLeft" style={{ width: '30%' }}>
          <Container className="mt-5 userDiv" style={{ width: '90%' }}>
            <p
              className="pt-2 mb-0 px-1"
              style={{
                textAlign: 'center',
                textDecoration: 'underline',
                fontWeight: 'bold',
                color: '#a9a9a9',
                fontSize: '22px'
              }}
            >
              Filters
            </p>
            <div className="p-2">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: 'UPDATEFILTERS',
                    payload: {
                      jobTitle: jobTitleFilter,
                      industry: industryFilter,
                      contractDuration: contractDurationFilter,
                      skills: skillsFilter
                    }
                  });
                }}
              >
                <Row className="">
                  <Form.Group controlId="jobRoleFilter">
                    <Form.Label>Job Title: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Job Title Filter"
                      value={jobTitleFilter}
                      onChange={(e) => setJobTitleFilter(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group>
                    <Form.Label>Skills Filter: </Form.Label>
                    <Typeahead
                      multiple
                      id="basic-typeahead-multiple"
                      labelKey="skills"
                      options={skills}
                      placeholder="Skills Filter"
                      selected={skillsFilter}
                      ref={ref}
                      onChange={(selections) => {
                        setSkillsFilter(selections);
                        ref.current.toggleMenu();
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group>
                    <Form.Label>Job Industries Filter: </Form.Label>
                    <Typeahead
                      multiple
                      id="basic-typeahead-multiple-industry"
                      labelKey="industry"
                      options={jobIndustries}
                      placeholder="Industry Filter"
                      selected={industryFilter}
                      ref={ref2}
                      onChange={(selections) => {
                        setIndustryFilter(selections);
                        ref2.current.toggleMenu();
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group>
                    <Form.Label>Contract Duration Filter: </Form.Label>
                    <Typeahead
                      multiple
                      id="basic-typeahead-multiple-duration"
                      labelKey="ContractDuration"
                      options={contractDuration}
                      placeholder="Industry Filter"
                      selected={contractDurationFilter}
                      ref={ref3}
                      onChange={(selections) => {
                        setContractDurationFilter(selections);
                        ref3.current.toggleMenu();
                      }}
                    />
                  </Form.Group>
                </Row>
                <div className="my-3 text-center">
                  <Button
                    className="btn px-3 py-1"
                    type="submit"
                    style={{ backgroundColor: '#3b5998' }}
                  >
                    <span>Apply Filters</span>
                  </Button>
                </div>
              </Form>
            </div>
          </Container>
        </div>
        <div className="jobDisplayRight" style={{ width: '70%' }}>
          <Container className="mt-5">
            {data && data === 'No Jobs Posted.' ? (
              <div className="text-center">NO JOBS POSTED.</div>
            ) : (
              <>
                {filters.filteredJobs.map((job, index) => (
                  <SingleJob user={user} job={job} key={index} />
                ))}
              </>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
