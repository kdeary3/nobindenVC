import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Badge, CardImg} from "react-bootstrap";

function DashboardStartupModal({show, handleClose, startup}) {
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
                                <img src={"/images/google.png"} alt="Card description" className="card-img" />
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
                        <div className="col-12">
                            <div className="p-3 border rounded bg-light mb-2">
                                <span className="h6 mb-0">Projected Round Exit: AUG 2026</span> <br/>
                                <span className="h6 mb-0">Primary Partner: Keno Deary</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="p-3 border rounded bg-light mb-2">
                                <span className="h6 mb-0">Notes: </span> <br/>
                                <span>
                                    <ul>
                                        <li>Spoke with founders on Apr 15, was updated on current growth trends, updated MVP.</li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-4">
                                <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-between">[Term Sheet]</div>
                        </div>

                        <div className="col-4">
                                <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-between">[Cap Table]</div>
                        </div>

                        <div className="col-4">
                                <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-between">[Latest Deck]</div>
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