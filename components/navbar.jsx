// dependency imports
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

// page imports
import Home from "../components/pages/home.jsx";
import About from "../components/pages/about.jsx";
import Partners from "../components/pages/partners.jsx";
import Portfolio from "../components/pages/portfolio.jsx";
import Apply from "../components/pages/apply.jsx";


const NobindenNavbar = () => {
    return (
        <Router>
            <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
                <Container fluid className="px-5">
                    <Navbar.Brand as={Link} to="/home">React-Bootstrap</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/partners">Partners</Nav.Link>

                            <NavDropdown title="Startups" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/portfolio">Our Portfolio</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/apply">Apply</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="px-5">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default NobindenNavbar;