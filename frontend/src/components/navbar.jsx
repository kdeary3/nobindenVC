import { Routes, Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Home from "../pages/home.jsx";
import About from "../pages/about.jsx";
import Partners from "../pages/partners.jsx";
import Portfolio from "../pages/portfolio.jsx";
import Apply from "../pages/apply.jsx";

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
                            <LinkContainer to="/partners"><Nav.Link>Partners</Nav.Link></LinkContainer>

                            <NavDropdown title="Startups" id="basic-nav-dropdown">
                                <LinkContainer to="/portfolio"><NavDropdown.Item>Our Portfolio</NavDropdown.Item></LinkContainer>
                                <LinkContainer to="/apply"><NavDropdown.Item>Apply</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NobindenNavbar;