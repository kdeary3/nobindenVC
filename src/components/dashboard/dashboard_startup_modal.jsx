import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DashboardStartupModal({ show, handleClose, startup}) {
    if (!startup) return null;

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">
                        {startup.name} — <span className="text-muted">{startup.stage}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <h5>Overview</h5>
                        <p>Evaluating this <strong>{startup.sector}</strong> venture at <strong>{startup.eval}/10</strong>.</p>
                    </div>

                    <div className="row g-3">
                        <div className="col-6">
                            <div className="p-3 border rounded bg-light">
                                <small className="text-uppercase text-muted d-block">Equity Offered</small>
                                <span className="h4 mb-0">{startup.equity}%</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 border rounded bg-light">
                                <small className="text-uppercase text-muted d-block">Funds Accrued</small>
                                <span className="h4 mb-0">${startup.funds_accrued}k</span>
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