import { Link } from "react-router-dom";

const NobindenNavbar = () => {
    return (
        <nav className="nb-navbar">
            <Link to="/" className="nb-navbar-brand">nobindenVC</Link>
            <ul className="nb-navbar-links">
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/partners/dashboard">Partners</Link></li>
                <li><Link to="/startups/apply" className="nb-navbar-apply">Apply</Link></li>
            </ul>
        </nav>
    );
};

export default NobindenNavbar;
