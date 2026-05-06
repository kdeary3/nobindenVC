import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Badge} from "react-bootstrap";
import type {Startup} from "../../startup/startup_type.ts";
import StartupCardFundingChart from "./startup_card_funding_chart.tsx";
import {formatCurrency} from "./format_currency.tsx";

type StartupModalProps = {
    show: boolean;
    handleClose: () => void;
    handleDelete: () => void;
    startup: Startup | null;
}

function StartupModal({show, handleClose, handleDelete, startup}: StartupModalProps) {
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
                                <img src={`/images/startup-logos/${startup.name.toLowerCase()}.png`} alt={`${startup.name} logo`} className="card-img"/>
                                <Modal.Title className="fw-bold">
                                    {startup.name} <br/>
                                    <Badge bg="info" className="text-dark">
                                        {startup.sector}
                                    </Badge>
                                    <Badge bg="warning" className="text-dark">
                                        {startup.stage}
                                    </Badge> <br/>
                                    {startup.founders && startup.founders.length > 0 && (
                                        <div className="mt-2">
                                            <h6 className="mb-1">{startup.founders.length === 1 ? 'Founder' : 'Founders'}:</h6>
                                            {startup.founders.map((founder, index) => (
                                                <h6 key={index}>{founder}</h6>
                                            ))}
                                        </div>
                                    )}

                                </Modal.Title>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Total Funds Accrued</small>
                                <span className="h4 mb-0">{formatCurrency(startup.funds_accrued)}</span>
                            </div>
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Current Equity</small>
                                <span className="h4 mb-0">{startup.equity}%</span>
                            </div>
                            <div className="p-3 border rounded bg-light">
                                <small className="text-uppercase text-muted d-block">Valuation</small>
                                <span className="h4 mb-0">${startup.eval}k</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <StartupCardFundingChart startup={startup}/>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-6">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Projected Round Exit:</small>
                                <span className="h6 mb-0">{startup.projected_close || '—'}</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 border rounded bg-light mb-2">
                                <small className="text-uppercase text-muted d-block">Primary Partner:</small>
                                <span className="h6 mb-0">{startup.partner?.name ?? 'Unassigned'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="p-3 border rounded bg-light mb-2">
                                <span className="h6 mb-0"> <strong>Notes:</strong></span> <br/>
                                <span>
                                    <ul>
                                        {startup.startupNotes?.map((note, index) =>
                                            <li key={index}>
                                                {note}
                                            </li>
                                        )}
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
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StartupModal;