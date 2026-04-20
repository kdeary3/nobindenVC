import {Badge, Card, Stack} from "react-bootstrap";

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

function StartupCard({ startup }) {
    return (
        <Card className="mb-2 shadow-sm border-0" style={dashboardStyle.cardStyle}>
            {startup.logo && <Card.Img variant="top" src={startup.logo} alt={startup.name} className="p-2" />}
            <Card.Body className="p-3">
                <Card.Title className="h6 fw-bold mb-2">{startup.name}</Card.Title>

                <div className="small text-muted mb-3">
                    <div className="d-flex justify-content-between"><span>Eval:</span> <strong>{startup.eval} / 10</strong></div>
                    <div className="d-flex justify-content-between"><span>Equity:</span> <strong>{startup.equity}%</strong></div>
                    <div className="d-flex justify-content-between"><span>Total Funds Accrued:</span> <strong>${startup.funds_accrued}k</strong></div>
                    <div className="d-flex justify-content-between"><span>Projected Round Close:</span>
                        <Badge bg="light" className="fw-large text-muted border"><strong>{startup.projected_close}</strong></Badge>
                    </div>
                </div>

                <Stack direction="horizontal" gap={1}>
                    <Badge bg="info" className="text-dark">{startup.sector}</Badge>
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default StartupCard;

