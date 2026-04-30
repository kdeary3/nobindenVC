import {Badge, Card, Stack} from "react-bootstrap";
import {dashboardStyle} from "./dashboard_style.tsx";
import {Draggable} from "@hello-pangea/dnd";
import type {Startup} from "../../startup/startup_type.ts";

type PipelineStartupCardProps = {
    startup: Startup;
    onClick: () => void;
    index: number;
}

function StartupCard({startup, onClick, index}: PipelineStartupCardProps) {
    return (
        <Draggable draggableId={startup.id.toString()} index={index}>
            {(provided) => (
                <Card className="mb-2 shadow-sm border-0"
                      style={{...dashboardStyle.cardStyle, cursor: 'pointer', ...provided.draggableProps.style}}
                      onClick={onClick}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                >

                    {/*{startup.logo && <Card.Img variant="top" src={startup.logo} alt={startup.name} className="p-2"/>}*/}

                    <Card.Body className="p-3">
                        <Card.Title className="h6 fw-bold mb-2">{startup.name}</Card.Title>
                        <div className="small text-muted mb-3">
                            <div className="d-flex justify-content-between"><span>Eval:</span> <strong>{startup.eval} /
                                10</strong></div>
                            <div className="d-flex justify-content-between"><span>Equity:</span>
                                <strong>{startup.equity}%</strong></div>
                            <div className="d-flex justify-content-between"><span>Total Funds Accrued:</span>
                                <strong>${startup.funds_accrued}k</strong></div>
                            <div className="d-flex justify-content-between"><span>Projected Round Close:</span>
                                <Badge bg="light"
                                       className="fw-large text-muted border"><strong>{startup.projected_close}</strong></Badge>
                            </div>
                        </div>

                        <Stack direction="horizontal" gap={1}>
                            <Badge bg="info" className="text-dark">{startup.sector}</Badge>
                        </Stack>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    );
};

export default StartupCard;

