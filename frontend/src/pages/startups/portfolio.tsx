import { useEffect, useState } from 'react';
import { axiosGetAllStartups } from '../../startup/startup_service';
import type { Startup } from '../../startup/startup_type';

const LOGO_COLORS = [
    '#0a0a0a', '#1B4332', '#1c3a5e', '#4a1942',
    '#7c2d12', '#1e3a5f', '#374151', '#6b21a8',
];

const logoColor = (name: string) =>
    LOGO_COLORS[name.charCodeAt(0) % LOGO_COLORS.length];

const CompanyCard = ({ startup }: { startup: Startup }) => {
    const initial = startup.name.charAt(0).toUpperCase();
    const founders = startup.founders?.join(', ') ?? null;

    return (
        <div className="nb-company-card">
            <div
                className="nb-company-logo"
                style={{ background: logoColor(startup.name) }}
            >
                {initial}
            </div>
            <p className="nb-company-name">{startup.name}</p>
            {founders && (
                <p className="nb-company-founders">{founders}</p>
            )}
            <div className="nb-company-tags">
                {startup.sector && (
                    <span className="nb-tag">{startup.sector}</span>
                )}
                {startup.stage && (
                    <span className="nb-tag">{startup.stage}</span>
                )}
            </div>
        </div>
    );
};

const Portfolio = () => {
    const [startups, setStartups] = useState<Startup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosGetAllStartups()
            .then(setStartups)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="nb-portfolio-header">
                <h1 className="nb-eyebrow mt-3">Our Portfilio</h1>
                <h2 className="nb-portfolio-subtitle">
                    Companies we've backed from day one.
                </h2>
            </div>

            {loading && (
                <div className="nb-spinner">
                    <span className="nb-spinner-dot" />
                    <span className="nb-spinner-dot" />
                    <span className="nb-spinner-dot" />
                </div>
            )}

            {!loading && startups.length === 0 && (
                <div className="nb-portfolio-empty">
                    <p>Portfolio companies coming soon.</p>
                </div>
            )}

            {!loading && startups.length > 0 && (
                <div className="nb-portfolio-grid">
                    {startups.map((s, i) => (
                        <CompanyCard key={s.id ?? i} startup={s} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Portfolio;
