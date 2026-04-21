import {Badge, Button, Card} from "react-bootstrap";
import {dashboardStyle} from "./dashboard_style.jsx";
import PipelineStartupCard from "./pipeline_startup_card.jsx";

// Preseed, Seed, A, B, C Columns
const PipelineColumns = ({ title, startups, onCardClick }) => {
    return (
        <Card className="shadow-sm me-4" style={dashboardStyle.columnBackground}>
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

export default PipelineColumns;