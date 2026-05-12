import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const NobindenNavbar = () => {
    return (
        <Navbar expand="lg" sticky="top" className="nb-navbar">
            <Container fluid className="px-4">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src="/images/logo.png" alt="nobindenVC"/>
                        &nbsp; nobindenVC
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="main-nav"/>
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-lg-auto align-items-center gap-3">
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="Partners" id="partners-dropdown" className="nb-partners-dropdown">
                            <LinkContainer to="/partners/dashboard">
                                <NavDropdown.Item>Partner Dashboard</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/partners/startup-applications">
                                <NavDropdown.Item>Startup Applications</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                        <LinkContainer to="/portfolio">
                            <Nav.Link>Portfolio</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/startups/apply">
                            <Nav.Link className="nb-nav-apply">Apply</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NobindenNavbar;