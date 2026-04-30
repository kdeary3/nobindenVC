import {useEffect, useState} from "react";
import {Badge, Table} from "react-bootstrap";
import {axiosGetAllApplications} from "../../application/application_service";
import type {Application} from "../../application/application_type";

const statusVariant = (status: string) => {
    if (status === "APPROVED") return "success";
    if (status === "REJECTED") return "danger";
    return "warning";
}

const ReviewApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        axiosGetAllApplications()
            .then(setApplications)
            .catch(console.error);
    }, []);

    return (
        <div className="p-4">
            <h1 className="h2 fw-bold mb-4">Startup Applications</h1>
            <Table hover responsive>
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Sector</th>
                    <th>Target Round</th>
                    <th>Founders</th>
                    <th>Contact</th>
                    <th>Submitted</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {applications.map(startup => (
                    <tr key={startup.id}>
                        <td className="fw-semibold">{startup.name}</td>
                        <td>{startup.sector}</td>
                        <td>{startup.targetRound}</td>
                        <td>{startup.founders.join(", ")}</td>
                        <td>
                            <div>{startup.founderEmail}</div>
                            <small className="text-muted">{startup.founderPhoneNumber}</small>
                        </td>
                        <td>{new Date(startup.submittedAt).toLocaleDateString()}</td>
                        <td>
                            <Badge bg={statusVariant(startup.status)}>{startup.status}</Badge>
                        </td>
                    </tr>
                ))}
                {applications.length === 0 && (
                    <tr>
                        <td colSpan={7} className="text-center text-muted py-4">No applications submitted yet.</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default ReviewApplications;
