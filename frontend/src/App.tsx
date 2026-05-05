import NobindenNavbar from "./pages/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home.tsx";
import About from "./pages/about";
import Dashboard from "./pages/partners/dashboard.tsx";
import Portfolio from "./pages/startups/portfolio.tsx";
import StartupApplications from "./pages/partners/startup_applications.tsx";
import Apply from "./pages/startups/apply.tsx";

const App = () => {
    return (
        <Router>
            <NobindenNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<div className="nb-page-content"><About /></div>} />
                <Route path="/partners/dashboard" element={<div className="nb-page-content"><Dashboard /></div>} />
                <Route path="/partners/startup-applications" element={<div className="nb-page-content"><StartupApplications /></div>} />
                <Route path="/startups/apply" element={<div className="nb-page-content"><Apply /></div>} />
            </Routes>
        </Router>
    );
};

export default App;
