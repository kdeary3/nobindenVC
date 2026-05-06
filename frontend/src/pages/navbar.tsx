import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NobindenNavbar = () => {
    const [logoErr, setLogoErr] = useState(false);

    return (
        <Navbar expand="lg" sticky="top" className="nb-navbar">
            <Container fluid className="px-4">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        {!logoErr
                            ? <img src="/images/logo.png" alt="nobindenVC" onError={() => setLogoErr(true)}  />
                            : 'nobindenVC'
                        }
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto align-items-center gap-3">
                        <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                        <LinkContainer to="/partners/dashboard"><Nav.Link>Partners</Nav.Link></LinkContainer>
                        <LinkContainer to="/portfolio"><Nav.Link>Portfolio</Nav.Link></LinkContainer>
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
