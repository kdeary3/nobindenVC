import {useEffect, useState} from "react";
import {Badge, Table, Button} from "react-bootstrap";
import {axiosGetAllApplications, axiosDeleteApplication} from "../../application/application_service";
import type {Application} from "../../application/application_type";

const statusVariant = (status: string) => {
    if (status === "APPROVED") return "success";
    if (status === "REJECTED") return "danger";
    return "warning";
}

const ReviewApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    useEffect(() => {
        axiosGetAllApplications()
            .then(setApplications)
            .catch(console.error);
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axiosDeleteApplication(id);
            setApplications(prev => prev.filter(app => app.id !== id));
            setConfirmDeleteId(null);
        } catch (error) {
            console.error("Failed to delete application:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="nb-eyebrow mt-3">Startup Applications</h1>
            <Table hover responsive>
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Sector</th>
                    <th>Target Round</th>
                    <th>Founders</th>
                    <th>Contact</th>
                    <th>Comments</th>
                    <th>Pitch Deck</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {applications.map(application => (
                    <tr key={application.id}>
                        <td className="fw-semibold">{application.name}</td>
                        <td>{application.sector}</td>
                        <td>{application.targetRound}</td>
                        <td>{application.founders.join(", ")}</td>
                        <td>
                            <div>{application.founderEmail}</div>
                            <small className="text-muted">{application.founderPhoneNumber}</small>
                        </td>
                        <td>
                            <small>{application.additionalComments || <span className="text-muted">—</span>}</small>
                        </td>
                        <td>
                            {application.deckFilename ? (
                                <a href={`/api/v1/application/${application.id}/deck`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="btn btn-outline-primary btn-sm">
                                    📄 View Deck
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    disabled
                                >
                                    No Deck
                                </button>
                            )}
                        </td>
                        <td>{new Date(application.submittedAt).toLocaleDateString()}</td>
                        <td>
                            <Badge bg={statusVariant(application.status)}>{application.status}</Badge>
                        </td>
                        <td>
                            {confirmDeleteId === application.id ? (
                                <div className="d-flex gap-1">
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => handleDelete(application.id!)}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        onClick={() => setConfirmDeleteId(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="outline-danger"
                                    onClick={() => setConfirmDeleteId(application.id!)}
                                >
                                    <i className="fa-solid fa-trash-can"/> Delete
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                {applications.length === 0 && (
                    <tr>
                        <td colSpan={10} className="text-center text-muted py-4">
                            No applications submitted yet.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default ReviewApplications;