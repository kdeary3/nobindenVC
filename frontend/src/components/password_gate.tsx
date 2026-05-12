import {useState, type ReactNode, type FormEvent} from 'react';
import {Button, Form, Alert} from 'react-bootstrap';

const DASHBOARD_PASSWORD = 'asdfghjkl;\'';  // change to whatever you want

type PasswordGateProps = {
    children: ReactNode;
};

function PasswordGate({children}: PasswordGateProps) {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (input === DASHBOARD_PASSWORD) {
            setUnlocked(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    if (unlocked) return <>{children}</>;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '60vh'}}>
            <div style={{maxWidth: 400, width: '100%'}}>
                <h3 className="mb-3" style={{alignItems: 'center'}} >
                    <img
                        src="/images/logo.png"
                        alt="nobinden-logo"
                        style={{height: '1.2em', marginRight: '0.5em'}}
                    />

                    Partner Access</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    {error && <Alert variant="danger">Incorrect password.</Alert>}
                    <Button type="submit" variant="primary" className="w-100">
                        Unlock
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default PasswordGate;