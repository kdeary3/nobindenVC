import {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import type {Startup} from '../../startup/startup_type.ts';
import {axiosSaveStartup} from '../../startup/startup_service.ts';

type AddStartupProps = {
    show: boolean;
    handleClose: () => void;
    stage: string;
    onSuccess: () => void;
}

const emptyForm = {name: '', sector: '', series: '', eval: '', equity: '', projected_close: ''};

function AddStartup({show, handleClose, stage, onSuccess}: AddStartupProps) {
    const [form, setForm] = useState(emptyForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axiosSaveStartup({
            ...form,
            eval: Number(form.eval),
            equity: Number(form.equity),
            funds_accrued: 0,
            stage,
        } as Startup);
        setForm(emptyForm);
        handleClose();
        onSuccess();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Startup — {stage}</Modal.Title>
            </Modal.Header>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Series</Form.Label>
                        <Form.Control name="series" value={form.series} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Valuation ($k)</Form.Label>
                        <Form.Control type="number" name="eval" value={form.eval} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Equity (%)</Form.Label>
                        <Form.Control type="number" name="equity" value={form.equity} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Projected Close</Form.Label>
                        <Form.Control name="projected_close" value={form.projected_close} onChange={handleChange}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="success" type="submit">Save Startup</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddStartup;
