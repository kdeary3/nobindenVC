import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WORDS = ['ambitious', 'bold', 'visionary', 'determined', 'relentless'];

const Home = () => {
    const [idx, setIdx] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const t = setInterval(() => {
            setShow(false);
            setTimeout(() => { setIdx(i => (i + 1) % WORDS.length); setShow(true); }, 350);
        }, 2800);
        return () => clearInterval(t);
    }, []);

    return (
            <div className="nb-home-left">
                <h1 className="nb-eyebrow mt-3">Pre-Seed Venture Capital</h1>
                <h1 className="nb-headline">
                    We back the world's most <br/>
                    {' '}
                    <span className={`nb-rotating-word ${show ? 'visible' : ''}`}>{WORDS[idx]}</span>
                    &nbsp; founders.
                </h1>
                <p className="nb-subline">
                    $1K–$5K in pre-seed funding for founders turning bold ideas into real companies.
                </p>
                <div className="nb-cta-group">
                    <Link to="/startups/apply" className="nb-btn-primary">Apply Now</Link>
                    <Link to="/portfolio" className="nb-btn-ghost">Our Portfolio →</Link>
                </div>
                    <p className="nb-panel-label mt-huge">What We Do</p>
                    <p className="nb-panel-body">
                        At nobindenVC, we provide pre-seed funding to founders who are just starting
                        out with their ideas. <br/>
                        We specialize in the idea stage because we understand
                        that innovation begins with a spark. <br/>
                        Like you, we're building from the ground up. We're driven by a shared vision to
                        make the world a better place through technology and software.
                    </p>
                </div>
    );
};

export default Home;
