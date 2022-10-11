import '../Contractor/ContractorHeader/ContractorHeader.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

const EmployerHeader = () => {
  const dispatch = useDispatch();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ background: '#3b5998', padding: '14px 0' }}
      variant="dark"
    >
      <Navbar.Brand href="#home">
        <div className="headerLeft">
          <div className="headerLeft__logo">ContractEmploy.com</div>
          <div className="headerLeft__bottomLogo">
            {'(Product Of DharmaWorks (India) Pvt.Ltd.)'}
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{ marginRight: '30px', background: '#fff' }}
      />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        style={{ marginLeft: '25px' }}
      >
        <Nav className="ms-auto">
          <div className="d-flex" style={{ marginRight: '30px' }}>
            <Link to="/employer/users-list">
              <Button className="contractor-header-button" type="button">
                Home
              </Button>
            </Link>
            <Link to="/employer/post-job">
              <Button className="contractor-header-button" type="button">
                Post-Job
              </Button>
            </Link>
            <Link to="/employer/posted-jobs">
              <Button className="contractor-header-button" type="button">
                Jobs
              </Button>
            </Link>
            <Link to="/employer/employer-details">
              <Button className="contractor-header-button" type="button">
                Profile
              </Button>
            </Link>
            <Link to="/">
              <Button
                className="contractor-header-button"
                type="button"
                onClick={() => {
                  Cookies.set('user', '');
                  dispatch({
                    type: 'LOGOUT'
                  });
                }}
              >
                Logout
              </Button>
            </Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default EmployerHeader;
