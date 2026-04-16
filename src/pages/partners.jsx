import React, { useState } from 'react'; // Added useState
import { Container, Card, Button, Badge, Stack } from 'react-bootstrap';

const dashboardStyle = {
    pageBackground: {
        backgroundColor: '#e2e4e6',
        minHeight: '90vh',
        width: '82vw',
        padding: '1rem',
        overflowX: 'auto',
    },
    columnBackground: {
        backgroundColor: '#f4f5f7',
        width: '320px',
        borderRadius: '8px',
        flexShrink: 0 // Prevents columns from squishing
    },
    cardStyle: {
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

// Startup Card
const StartupCard = ({ startup }) => {
    return (
        <Card className="mb-2 shadow-sm border-0" style={dashboardStyle.cardStyle}>
            {startup.logo && <Card.Img variant="top" src={startup.logo} alt={startup.name} className="p-2" />}
            <Card.Body className="p-3">
                <Card.Title className="h6 fw-bold mb-2">{startup.name}</Card.Title>

                <div className="small text-muted mb-3">
                    <div className="d-flex justify-content-between"><span>Eval:</span> <strong>{startup.eval} / 10</strong></div>
                    <div className="d-flex justify-content-between"><span>Equity:</span> <strong>{startup.equity}%</strong></div>
                    <div className="d-flex justify-content-between"><span>Total Funds Accrued:</span> <strong>${startup.funds_accrued}k</strong></div>
                </div>

                <Stack direction="horizontal" gap={1}>
                    <Badge bg="info" className="text-dark">{startup.sector}</Badge>
                    <Badge bg="light" className="text-muted border">{startup.projected_close}</Badge>
                </Stack>
            </Card.Body>
        </Card>
    );
};

// Series Columns
const SeriesColumns = ({ title, startups }) => {
    return (
        <Card className="border-0 shadow-sm me-3" style={dashboardStyle.columnBackground}>
            <Card.Header className="bg-transparent border-0 fw-bold text-uppercase p-3" style={{ fontSize: '1rem', color: '#5e6c84' }}>
                {title} <Badge bg="success" pill className="ms-1">{startups.length}</Badge>
            </Card.Header>
            <Card.Body className="pt-0 px-2 pb-2">
                {startups.map(s => <StartupCard key={s.id} startup={s} />)}
                <Button variant="light" className="w-100 text-start text-muted btn-sm border-0 mt-1">+ Add Startup</Button>
            </Card.Body>
        </Card>
    );
};

// 3. The Main Board
const Dashboard = () => {
    const [allStartups] = useState([
        { id: 1, name: "Startup 1", sector: "FinTech", eval: 9.5, equity: 3, funds_accrued: 500, projected_close: "02 APR 26", stage: "Preseed" },
        { id: 2, name: "Startup 2", sector: "Health", eval: 12.0, equity: 5, funds_accrued: 250, projected_close: "15 MAY 26", stage: "Preseed" },
        { id: 3, name: "Startup 3", sector: "SaaS", eval: 4.2, equity: 10, funds_accrued: 100, projected_close: "10 JUN 26", stage: "Seed" },
        { id: 4, name: "Startup 4", sector: "AI", eval: 25.0, equity: 2, funds_accrued: 1200, projected_close: "01 AUG 26", stage: "Series A" },
        { id: 5, name: "Startup 5", sector: "FinTech", eval: 9.5, equity: 3, funds_accrued: 500, projected_close: "02 APR 26", stage: "Preseed" },
        { id: 6, name: "Startup 6", sector: "Health", eval: 12.0, equity: 5, funds_accrued: 250, projected_close: "15 MAY 26", stage: "Preseed" },
        { id: 7, name: "Startup 7", sector: "SaaS", eval: 4.2, equity: 10, funds_accrued: 100, projected_close: "10 JUN 26", stage: "Seed" },
        { id: 8, name: "Startup 8", sector: "AI", eval: 25.0, equity: 2, funds_accrued: 1200, projected_close: "01 AUG 26", stage: "Series B" },
        { id: 9, name: "Startup 9", sector: "FinTech", eval: 9.5, equity: 3, funds_accrued: 500, projected_close: "02 APR 26", stage: "Series B" },
        { id: 10, name: "Startup 10", sector: "Health", eval: 12.0, equity: 5, funds_accrued: 250, projected_close: "15 MAY 26", stage: "Series C" },
        { id: 11, name: "Startup 11", sector: "SaaS", eval: 4.2, equity: 10, funds_accrued: 100, projected_close: "10 JUN 26", stage: "Exit" },
        { id: 12, name: "Startup 12", sector: "AI", eval: 25.0, equity: 2, funds_accrued: 1200, projected_close: "01 AUG 26", stage: "Series C" },
    ]);

    const stages = ["Preseed", "Seed", "Series A", "Series B", "Series C", "Exit"];

    return (
        <div style={dashboardStyle.pageBackground}>
            <div className="p-4">
                <h1 className="h2 mb-4 fw-bold text-dark">Partner Dashboard</h1>
                <div className="d-flex align-items-start pb-5">
                    {stages.map(stage => (
                        <SeriesColumns
                            key={stage}
                            title={stage}
                            startups={allStartups.filter(s => s.stage === stage)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Partners = () => {
    return(
        <Dashboard/>
    )
}

export default Partners;