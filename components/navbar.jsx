import Home from "../components/pages/home.jsx";
import About from "../components/pages/about.jsx";
import Partners from "../components/pages/partners.jsx";
import Portfolio from "../components/pages/portfolio.jsx";
import Apply from "../components/pages/apply.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <Router>
            <div>
                <div>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/partners">Partners</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="/apply">Apply</Link></li>
                    </ul>
                    <Routes>
                        <Route path="/home" element={<Home/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/partners" element={<Partners/>} />
                        <Route path="/portfolio" element={<Portfolio/>} />
                        <Route path="/apply" element={<Apply/>} />
                    </Routes>
                </div>
            </div>
        </Router>
    )};

export default Navbar