import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Badge} from "react-bootstrap";
import type {Startup} from "../../startup/startup_type.ts";
import StartupCardFundingChart from "./startup_card_funding_chart.tsx";
import {formatCurrency} from "./format_currency.tsx";
import {useState} from "react";

type StartupModalProps = {
    show: boolean;
    handleClose: () => void;
    handleDelete: () => void;
    startup: Startup | null;
}

type ModalLogoProps = { startup_name: string }

const ModalLogo = ({startup_name}: ModalLogoProps) => {
    const [imgError, setImgError] = useState(false);
    const initial = startup_name.charAt(0).toUpperCase();
    const imgPath = `/images/startup-logos/${startup_name.toLowerCase()}.png`;

    return (
        <>
            {!imgError ? (
                <img src={imgPath}
                     alt={`${startup_name} logo`} className="card-img"
                     onError={() => setImgError(true)}
                />
            ) : (
                <div
                    className="nb-company-logo"
                    style={{background: "black"}}
                >
                    {initial}
                </div>
            )}
        </>
    )
}


function StartupModal({show, handleClose, handleDelete, startup}: StartupModalProps) {
    if (!startup) return null;

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="row g-3">
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2">

                                <ModalLogo startup_name={startup.name}/>

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
                            {startup.applicationId && (
                                <a href={`/api/v1/application/${startup.applicationId}/deck`}
                                   target="_blank" rel="noopener noreferrer"
                                   className="btn btn-primary">
                                    See Deck
                                </a>
                            )}
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
    )
        ;
}

export default StartupModal;