import {Badge, Button, Card} from "react-bootstrap";
import {dashboardStyle} from "./dashboard_style.tsx";
import StartupCard from "./startup_card.tsx";
import {Droppable} from "@hello-pangea/dnd";
import {Startup} from "../../startup/startup_type.ts";
import {useState} from "react";
import AddStartup from "./add_startup.tsx";

type PipelineColumnsProps = {
    title: string
    startups: Startup[]
    onCardClick: (startup: Startup) => void
}

// Preseed, Seed, A, B, C Columns
const PipelineColumns = ({title, startups, onCardClick}: PipelineColumnsProps) => {
    const [showAddStartupModal, setShowAddStartupModal] = useState(false);
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);


    // open dashboard startup modal
    const handleOpenStartupModal = (startup: Startup) => {
        setSelectedStartup(startup);
        setShowAddStartupModal(true);
    }

    // close dashboard startup modal
    const handleCloseAddStartupModal = () => {
        setSelectedStartup(null);
        setShowAddStartupModal(false);
    }

    return (
        <>
            <Droppable droppableId={title}>
                {(provided) => (
                    <Card
                        className="shadow-sm me-4"
                        style={{...dashboardStyle.columnBackground, minWidth: '300px'}}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <Card.Header className="bg-transparent border-0 fw-bold text-uppercase p-3"
                                     style={{fontSize: '1rem', color: '#5e6c84'}}>
                            {title} <Badge bg="success" pill className="ms-1">{startups.length}</Badge>
                        </Card.Header>
                        <Card.Body className="pt-0 px-2 pb-2">
                            {startups.map(((s, index) =>
                                <StartupCard
                                    key={s.id}
                                    startup={s}
                                    index={index}
                                    onClick={() => onCardClick(s)}
                                />))}
                            {provided.placeholder}
                            <Button variant="light" className="w-100 text-start text-muted btn-sm border-0 mt-1"
                                    onClick={() => setShowAddStartupModal(true)}
                            >+ Add Startup</Button>
                        </Card.Body>
                    </Card>
                )}
            </Droppable>
            <AddStartup
                show={showAddStartupModal}
                handleClose={handleCloseAddStartupModal}
                startup={selectedStartup}
            />
        </>
    );
};

export default PipelineColumns;