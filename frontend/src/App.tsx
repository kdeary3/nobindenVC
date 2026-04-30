import NobindenNavbar from "./pages/navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";

import Home from "./pages/home.tsx";
import About from "./pages/about";
import Dashboard from "./pages/partners/dashboard.tsx";
import Portfolio from "./pages/startups/portfolio.tsx";
import StartupApplications from "./pages/partners/startup_applications.tsx";
import Apply from "./pages/startups/apply.tsx";

const App = () => {
    return (
        <Router>
            <NobindenNavbar /> {/* Just the visual bar */}
            <Container fluid className="px-5 py-4">
                <Routes> {/* All logic lives here */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/partners/dashboard" element={<Dashboard />} />
                    <Route path="/partners/startup-applications" element={<StartupApplications />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/startups/apply" element={<Apply />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App