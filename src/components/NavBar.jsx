import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useUserData } from "../UserDataContext";

const NavigationBar = () => {
  const{addUserData, isLoggedIn, setIsLoggedIn, userData} =useUserData()

  const logout = () => {
    localStorage.removeItem('token')
    addUserData(null)
    setIsLoggedIn(false)
  };
  return (
    <Navbar bg="light" expand="lg" className="w-full">
      <Navbar.Brand href="/">Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" justify variant="tabs">
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} eventKey="link-1" to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} eventKey="link-3" to="/deposit">
                Deposit
              </Nav.Link>
              <Nav.Link as={Link} eventKey="link-4" to="/withdraw">
                Withdraw
              </Nav.Link>
              <Nav.Link as={Link} eventKey="link-5" to="/all-data">
                All Data
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} eventKey="link-2" to="/create-account">
                Create Account
              </Nav.Link>
              <Nav.Link as={Link} eventKey="link-1" to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      {isLoggedIn && <div>
        <p>{userData.email}</p>
        <Button onClick={logout}>Log Out</Button>
      </div>}
      
    </Navbar>
  );
};

export default NavigationBar;
