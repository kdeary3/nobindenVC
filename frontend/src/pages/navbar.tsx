import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NobindenNavbar = () => {
    return (
        <> {/* Use a fragment instead of a Router here */}
            <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
                <Container fluid className="px-5">
                    <LinkContainer to="/home">
                        <Navbar.Brand>nobindenVC</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
                            <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                            <NavDropdown title="Partners" id="basic-nav-dropdown">
                                <LinkContainer to="partners/dashboard"><NavDropdown.Item>Dashboard</NavDropdown.Item></LinkContainer>
                                <LinkContainer to="partners/startup-applications"><NavDropdown.Item>Startup Applications</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                            <NavDropdown title="Startups" id="basic-nav-dropdown">
                                <LinkContainer to="startups/portfolio"><NavDropdown.Item>Our Portfolio</NavDropdown.Item></LinkContainer>
                                <LinkContainer to="startups/apply"><NavDropdown.Item>Apply</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NobindenNavbar;