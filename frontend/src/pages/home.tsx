import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ROTATING_WORDS = ['ambitious', 'bold', 'visionary', 'determined', 'relentless'];

const Home = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
                setVisible(true);
            }, 380);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="nb-hero">
                <div className="nb-hero-content">
                    <p className="nb-eyebrow">Pre-Seed Venture Capital</p>
                    <h1 className="nb-headline">
                        We back the world's most<br />
                        <span className={`nb-rotating-word ${visible ? 'visible' : ''}`}>
                            {ROTATING_WORDS[wordIndex]}
                        </span>{' '}founders.
                    </h1>
                    <p className="nb-subtext">
                        nobindenVC provides $1,000–$3,000 in pre-seed funding to founders
                        turning bold ideas into real companies.
                    </p>
                    <div className="nb-cta-group">
                        <Link to="/startups/apply" className="nb-btn-primary">Apply Now</Link>
                        <Link to="/portfolio" className="nb-btn-secondary">Our Portfolio →</Link>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="nb-section">
                <div className="nb-section-grid">
                    <div>
                        <h2 className="nb-section-title">What We Do</h2>
                    </div>
                    <div>
                        <p className="nb-body-text">
                            At nobindenVC, we provide pre-seed funding to startup founders who are just
                            starting out with their ideas. Our fund offers investments ranging from
                            $1,000 to $3,000 to help turn ambitious concepts into tangible progress.
                        </p>
                        <p className="nb-body-text">
                            We specialize in supporting startups at the idea stage because we understand
                            that innovation begins with a spark. Like you, we are building something from
                            the ground up — driven by a shared vision to make the world a better place
                            through technology and software.
                        </p>
                    </div>
                </div>

                <div className="nb-stats">
                    <div className="nb-stat">
                        <span className="nb-stat-number">$1K–$3K</span>
                        <span className="nb-stat-label">Check Size</span>
                    </div>
                    <div className="nb-stat">
                        <span className="nb-stat-number">Idea Stage</span>
                        <span className="nb-stat-label">Investment Focus</span>
                    </div>
                    <div className="nb-stat">
                        <span className="nb-stat-number">Growing</span>
                        <span className="nb-stat-label">Fund Status</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
