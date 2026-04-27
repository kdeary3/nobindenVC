import NobindenNavbar from "./components/navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";

import Home from "./pages/home.tsx";
import About from "./pages/about";
import Partners from "./pages/partners";
import Portfolio from "./pages/portfolio";
import Apply from "./pages/apply";

const App = () => {
    return (
        <Router>
            <NobindenNavbar /> {/* Just the visual bar */}
            <Container fluid className="px-5 py-4">
                <Routes> {/* All logic lives here */}
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

export default App