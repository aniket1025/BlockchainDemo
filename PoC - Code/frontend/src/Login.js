import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const Login = ({ onRoleSelect }) => {
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!role) {
            setError('Please select a role before logging in.');
            return;
        }
        setError('');  // Clear any existing error messages.
        onRoleSelect(role);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Select your role</Form.Label>
                <Form.Control 
                    as="select" 
                    value={role} 
                    onChange={e => setRole(e.target.value)} 
                    isInvalid={!!error}>
                    <option value="">-- Select a role --</option>
                    <option value="treasury">General Treasury</option>
                    <option value="subsidiary">Subsidiary</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary">Login</Button>
        </Form>
    );
};

export default Login;
