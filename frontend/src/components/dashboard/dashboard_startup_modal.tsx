import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Badge} from "react-bootstrap";
import type {Startup} from "../../startup/startup_type.ts";

type DashboardStartupModalProps = {
    show: boolean;
    handleClose: () => void;
    startup: Startup | null;
}

function DashboardStartupModal({show, handleClose, startup}: DashboardStartupModalProps) {
    if (!startup) return null;

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {/*<div className="mb-4 d-flex justify-content-between"><span>Founded:</span> 2009</div>*/}
                    {/*<div className="mb-4 d-flex justify-content-between"><span>Primary Partner:</span> Name</div>*/}
                    <div className="row g-3">
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2">
                                <img src={"/images/google.png"} alt="Card description" className="card-img"/>
                                <Modal.Title className="fw-bold">
                                    {startup.name} <br/>
                                    <Badge bg="info" className="text-dark">{startup.sector}</Badge> <br/>
                                    <span className="text-muted">{startup.stage} </span> <br/>
                                    <h6>Founder: Larry Page</h6>
                                    <h6>Email: larry@google.com</h6>

                                </Modal.Title>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Total Funds Accrued</small>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span>
                            </div>
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Current Equity</small>
                                <span className="h4 mb-0">{startup.equity}%</span>
                            </div>
                            <div className="p-3 border rounded bg-light">
                                <small className="text-uppercase text-muted d-block">Next Inject</small>
                                <span className="h4 mb-0">$100k</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Funding By Round</small> <br/>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span><br/>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span><br/>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span><br/>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span><br/>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span><br/>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-6">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Projected Round Exit:</small>
                                <span className="h6 mb-0">AUG 2026</span> <br/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Primary Partner:</small>
                                <span className="h6 mb-0">Keno Deary</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="p-3 border rounded bg-light mb-2">
                                <span className="h6 mb-0"> <strong>Notes:</strong></span> <br/>
                                <span>
                                    <ul>
                                        <li>Spoke with founders on Apr 15, was updated on current growth trends, updated MVP.</li>
                                    </ul>
                                </span>
                                <button>+ Add Note</button>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-between">
                                <button>See Term Sheet</button>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-between">
                                <button>See Cap Table</button>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-between">
                                <button>See Most Recent Deck</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Dismiss
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DashboardStartupModal;