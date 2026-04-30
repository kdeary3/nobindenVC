import {useEffect, useState} from "react";
import {dashboardStyle} from "../components/dashboard/dashboard_style";
import StartupModal from "../components/dashboard/startup_modal";
import PipelineColumns from "../components/dashboard/pipeline_columns";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {axiosDeleteStartup, axiosGetAllStartups, axiosUpdateStartupStage} from '../startup/startup_service';
import type {Startup} from '../startup/startup_type';

const Dashboard = () => {
    // visibility + data
    const [allStartups, setAllStartups] = useState<Startup[]>([]);
    const [showStartupModal, setShowStartupModal] = useState(false);
    const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
    const loadData = async () => {
        try {
            const data = await axiosGetAllStartups();
            const sanitizedData = data.map(s => ({
                ...s,
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

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const updatedStartups = allStartups.map(startup =>
            startup.id.toString() === draggableId.toString()
                ? { ...startup, stage: destination.droppableId }
                : startup
        );
        setAllStartups(updatedStartups);

        try {
            await axiosUpdateStartupStage(Number(draggableId), destination.droppableId)
        } catch {
            setAllStartups(allStartups)
        }
    };

    // open dashboard startup modal
    const handleOpenStartupModal = (startup: Startup) => {
        setSelectedStartup(startup);
        setShowStartupModal(true);
    }

    // close dashboard startup modal
    const handleCloseStartupModal = () => {
        setSelectedStartup(null);
        setShowStartupModal(false);
    }

    const handleDeleteStartup = async () => {
        if (!selectedStartup) return
        await axiosDeleteStartup(selectedStartup.id)
        handleCloseStartupModal()
        loadData()
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
                                onStartupAdded={loadData}
                            />
                        ))}
                    </div>
                </DragDropContext>
            </div>
            <StartupModal
                show={showStartupModal}
                handleClose={handleCloseStartupModal}
                handleDelete={handleDeleteStartup}
                startup={selectedStartup}
            />
        </div>
    );
};

export default Dashboard;