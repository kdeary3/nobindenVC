import {useEffect, useState} from "react";
import {dashboardStyle} from "./dashboard/dashboard_style";
import DashboardStartupModal from "./dashboard/dashboard_startup_modal";
import PipelineColumns from "./dashboard/pipeline_columns";
import {DragDropContext} from "@hello-pangea/dnd";
import {axiosDeleteStartup, axiosGetAllStartups} from '../startup/startup_service';
import type {Startup} from '../startup/startup_type';


const Dashboard = () => {
    // visibility + data
    const [allStartups, setAllStartups] = useState([]);
    const [showStartupModal, setShowStartupModal] = useState(false);
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
    const loadData = async () => {
        try {
            const data = await axiosGetAllStartups();
            const sanitizedData = data.map(s => ({
                ...s,
                // Ensure 'stage' is set, as that's what your columns filter by
                stage: s.stage || "Preseed"
            }));
            setAllStartups(sanitizedData);
        } catch (error) {
            console.error("Failed to sync with nobinden backend:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Optimistic UI Update: Update locally first so the UI feels snappy
        const updatedStartups = allStartups.map(startup =>
            startup.id.toString() === draggableId.toString() // Force both to string
                ? { ...startup, stage: destination.droppableId }
                : startup
        );
        setAllStartups(updatedStartups);

        // TODO: Call an axiosUpdateStartupStage(draggableId, destination.droppableId)
        // to persist the change in your PostgreSQL database.
    };

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

    const stages = ["Preseed", "Seed", "Series A", "Series B", "Series C", "Exit"];

    return (
        <div className="d-flex justify-content-between" style={dashboardStyle.pageBackground}>
            <div className="p-4">
                <h1 className="h2 mb-4 fw-bold text-dark">Partner Dashboard</h1>
                <DragDropContext onDragEnd={onDragEnd}>
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
                </DragDropContext>
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