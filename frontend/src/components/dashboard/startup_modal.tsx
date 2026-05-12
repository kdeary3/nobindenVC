import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Badge} from "react-bootstrap";
import type {Startup} from "../../startup/startup_type.ts";
import StartupCardFundingChart from "./startup_card_funding_chart.tsx";
import {formatCurrency} from "./format_currency.tsx";
import {useEffect, useState} from "react";
import StartupNotes from "./add_delete_startup_note.tsx";

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
    const [notes, setNotes] = useState<string[]>([]);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        setNotes(startup?.startupNotes || []);
        setConfirmDelete(false);
    }, [startup]);

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
                                <span className="h6 mb-0"><strong>Notes:</strong></span>
                                {startup.id && (
                                    <StartupNotes
                                        startupId={startup.id}
                                        notes={notes}
                                        onNoteAdded={(note) => setNotes(prev => [...prev, note])}
                                        onNoteDeleted={(note) => setNotes(prev => prev.filter(n => n !== note))}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm mt-1"
                                >
                                    See Term Sheet
                                </button>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm mt-1"
                                >
                                    See Cap Table
                                </button>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="p-3 border rounded bg-light mb-2 d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm mt-1"
                                >
                                    See Latest Deck
                                </button>
                            </div>
                        </div>

                        {/*<div className="col-4">*/}
                        {/*    {startup.applicationId && (*/}
                        {/*        <a href={`/api/v1/application/${startup.applicationId}/deck`}*/}
                        {/*           target="_blank" rel="noopener noreferrer"*/}
                        {/*           className="btn btn-primary">*/}
                        {/*            See Latest Deck*/}
                        {/*        </a>*/}
                        {/*    )}*/}
                        {/*</div>*/}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {confirmDelete ? (
                        <>
                            <span className="me-auto text-danger fw-semibold">Are you sure?</span>
                            <Button variant="danger" onClick={handleDelete}>
                                Confirm Delete
                            </Button>
                            <Button variant="outline-secondary" onClick={() => setConfirmDelete(false)}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                                <i className="fa-solid fa-trash-can"/> Delete
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}

export default StartupModal;