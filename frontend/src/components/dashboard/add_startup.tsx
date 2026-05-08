import {useEffect, useState} from 'react';
import {Badge, Button, Col, Row, Form, Modal, Table} from 'react-bootstrap';
import {axiosSaveStartup} from '../../startup/startup_service.ts';
import type {Application} from "../../application/application_type.tsx";
import {axiosGetAllApplications} from "../../application/application_service.tsx";

type AddStartupProps = {
    show: boolean;
    handleClose: () => void;
    stage: string;
    onSuccess: () => void;
}

const emptyForm = {name: '', sector: '', series: '', eval: '', equity: '', projected_close: ''};

function AddStartup({show, handleClose, stage, onSuccess}: AddStartupProps) {
    const [form, setForm] = useState(emptyForm);
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    useEffect(() => {
        axiosGetAllApplications()
            .then(setApplications)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!show) {
            setForm(emptyForm);
            setSelectedApplication(null);
        }
    }, [show]);

    const handleRowClick = (application: Application) => {
        setSelectedApplication(application);
        setForm(prev => ({
            ...prev,
            name: application.name,
            sector: application.sector,
            series: application.targetRound,
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            name: form.name,
            sector: form.sector,
            series: form.series,
            eval: Number(form.eval),
            equity: Number(form.equity),
            funds_accrued: 0,
            projected_close: form.projected_close || null,
            stage: stage,
            founders: selectedApplication?.founders || [],
            fundingByRound: {},
            partner: null,
            startupNotes: []
        };

        console.log("Sending Payload:", payload); // Check this in your browser console!

        try {
            await axiosSaveStartup(payload as any);
            setForm(emptyForm);
            handleClose();
            onSuccess();
        } catch (error) {
            console.error("The Server rejected the request. Check the Java console for the exact reason.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Add Startup — {stage}</Modal.Title>
            </Modal.Header>
            <Row className="g-0">
                <Col className="col-7">
                    <Modal.Body>
                        {/*<p className="text-muted small mb-2">Select an application.</p>*/}
                        <Table hover responsive>
                            <thead>
                            <tr>
                                <th>Company</th>
                                <th>Sector</th>
                                <th>Target Round</th>
                                <th>Status</th>
                                <th>Deck</th>
                            </tr>
                            </thead>
                            <tbody>
                            {applications.map(application => (
                                <tr
                                    key={application.id}
                                    onClick={() => handleRowClick(application)}
                                    style={{cursor: 'pointer'}}
                                    className={selectedApplication?.id === application.id ? 'table-success' : ''}
                                >
                                    <td className="fw-semibold">{application.name}</td>
                                    <td>{application.sector}</td>
                                    <td>{application.targetRound}</td>
                                    <td>
                                        <Badge
                                            bg={application.status === 'APPROVED' ? 'success' : application.status === 'REJECTED' ? 'danger' : 'warning'}>
                                            {application.status}
                                        </Badge>
                                    </td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        {application.deckFilename ? (
                                            <a href={`/api/v1/application/${application.id}/deck`}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="btn btn-outline-success">
                                                See Deck
                                            </a>
                                            ) : (
                                            <span className="text-muted">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Col>
                <Col className="col-5">
                    {selectedApplication && (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control name="name" value={form.name} onChange={handleChange} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sector</Form.Label>
                                    <Form.Control name="sector" value={form.sector} onChange={handleChange} required/>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Target Round</Form.Label>
                                            <Form.Control value={form.series} readOnly plaintext
                                                          className="text-muted"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Series</Form.Label>
                                            <Form.Control value={stage} readOnly plaintext className="text-muted"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Startup Evaluation (x/10)</Form.Label>
                                    <Form.Control type="number" name="eval" value={form.eval} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Equity (%)</Form.Label>
                                    <Form.Control type="number" name="equity" value={form.equity}
                                                  onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Projected Close</Form.Label>
                                    <Form.Control type="date" name="projected_close" value={form.projected_close}
                                                  onChange={handleChange}/>
                                </Form.Group>

                                {/*<Form.Group className="mb-3">*/}
                                {/*    <Form.Label>Projected Close</Form.Label>*/}
                                {/*    <Form.Control*/}
                                {/*        type="date"*/}
                                {/*        name="projected_close"*/}
                                {/*        value={form.projected_close}*/}
                                {/*        onChange={handleChange}*/}
                                {/*    />*/}
                                {/*</Form.Group>*/}

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                                <Button variant="success" type="submit">Save Startup</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Col>
            </Row>
        </Modal>
    );
}

export default AddStartup;
