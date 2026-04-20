import React, {useState} from "react";
import {dashboardStyle} from "./dashboard/dashboard_style.jsx";
import DashboardStartupModal from "./dashboard/dashboard_startup_modal.jsx";
import {Badge, Button, Card} from "react-bootstrap";
import PipelineStartupCard from "./dashboard/pipeline_startup_card.jsx";

// Preseed, Seed, A, B, C Columns
const PipelineColumns = ({ title, startups, onCardClick }) => {
    return (
        <Card className="border-0 shadow-sm me-3" style={dashboardStyle.columnBackground}>
            <Card.Header className="bg-transparent border-0 fw-bold text-uppercase p-3" style={{ fontSize: '1rem', color: '#5e6c84' }}>
                {title} <Badge bg="success" pill className="ms-1">{startups.length}</Badge>
            </Card.Header>
            <Card.Body className="pt-0 px-2 pb-2">
                {startups.map(s => <PipelineStartupCard key={s.id} startup={s} onClick={() => onCardClick(s)}/>)}
                <Button variant="light" className="w-100 text-start text-muted btn-sm border-0 mt-1">+ Add Startup</Button>
            </Card.Body>
        </Card>
    );
};

const Dashboard = () => {
    // visibility + data
    const [showStartupModal, setShowStartupModal] = useState(false);
    const [selectedStartup, setSelectedStartup] = useState(null);

    // open dashboard startup modal
    const handleOpenStartupModal = (startup) => {
        setSelectedStartup(startup);
        setShowStartupModal(true);
    }

    // close dashboard startup modal
    const handleCloseStartupModal = () => {
        setSelectedStartup(null);
        setShowStartupModal(false);
    }

    const [allStartups] = useState([
        { id: 1, name: "Google", sector: "Tech", eval: 9.5, equity: 3, funds_accrued: 500, projected_close: "02 APR 26", stage: "Series A" },
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
                        <PipelineColumns
                            key={stage}
                            title={stage}
                            startups={allStartups.filter(s => s.stage === stage)}
                            onCardClick={handleOpenStartupModal}
                        />
                    ))}
                </div>
            </div>
            <DashboardStartupModal
                show={showStartupModal}
                handleClose={handleCloseStartupModal}
                startup={selectedStartup}
            />
        </div>
    );
};

export default Dashboard;