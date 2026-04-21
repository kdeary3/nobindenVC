import React, {useState} from "react";
import {dashboardStyle} from "./dashboard/dashboard_style.jsx";
import DashboardStartupModal from "./dashboard/dashboard_startup_modal.jsx";
import PipelineColumns from "./dashboard/pipeline_columns.jsx";
import {DragDropContext} from "@hello-pangea/dnd";

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

    const [allStartups, setAllStartups] = useState([
        {
            id: 1,
            name: "Google",
            sector: "Tech",
            eval: 9.5,
            equity: 3,
            funds_accrued: 500,
            projected_close: "02 APR 26",
            stage: "Series A"
        },
        {
            id: 2,
            name: "Startup 2",
            sector: "Health",
            eval: 12.0,
            equity: 5,
            funds_accrued: 250,
            projected_close: "15 MAY 26",
            stage: "Preseed"
        },
        {
            id: 3,
            name: "Startup 3",
            sector: "SaaS",
            eval: 4.2,
            equity: 10,
            funds_accrued: 100,
            projected_close: "10 JUN 26",
            stage: "Seed"
        },
        {
            id: 4,
            name: "Startup 4",
            sector: "AI",
            eval: 25.0,
            equity: 2,
            funds_accrued: 1200,
            projected_close: "01 AUG 26",
            stage: "Series A"
        },
        {
            id: 5,
            name: "Startup 5",
            sector: "FinTech",
            eval: 9.5,
            equity: 3,
            funds_accrued: 500,
            projected_close: "02 APR 26",
            stage: "Preseed"
        },
        {
            id: 6,
            name: "Startup 6",
            sector: "Health",
            eval: 12.0,
            equity: 5,
            funds_accrued: 250,
            projected_close: "15 MAY 26",
            stage: "Preseed"
        },
        {
            id: 7,
            name: "Startup 7",
            sector: "SaaS",
            eval: 4.2,
            equity: 10,
            funds_accrued: 100,
            projected_close: "10 JUN 26",
            stage: "Seed"
        },
        {
            id: 8,
            name: "Startup 8",
            sector: "AI",
            eval: 25.0,
            equity: 2,
            funds_accrued: 1200,
            projected_close: "01 AUG 26",
            stage: "Series B"
        },
        {
            id: 9,
            name: "Startup 9",
            sector: "FinTech",
            eval: 9.5,
            equity: 3,
            funds_accrued: 500,
            projected_close: "02 APR 26",
            stage: "Series B"
        },
        {
            id: 10,
            name: "Startup 10",
            sector: "Health",
            eval: 12.0,
            equity: 5,
            funds_accrued: 250,
            projected_close: "15 MAY 26",
            stage: "Series C"
        },
        {
            id: 11,
            name: "Startup 11",
            sector: "SaaS",
            eval: 4.2,
            equity: 10,
            funds_accrued: 100,
            projected_close: "10 JUN 26",
            stage: "Exit"
        },
        {
            id: 12,
            name: "Startup 12",
            sector: "AI",
            eval: 25.0,
            equity: 2,
            funds_accrued: 1200,
            projected_close: "01 AUG 26",
            stage: "Series C"
        },
    ]);

    const stages = ["Preseed", "Seed", "Series A", "Series B", "Series C", "Exit"];

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        // If dropped outside a list or in the same spot
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Update the startup's stage in the state
        const updatedStartups = allStartups.map(startup => {
            if (startup.id === draggableId) {
                return {...startup, stage: destination.droppableId};
            }
            return startup;
        });

        setAllStartups(updatedStartups);
    };

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