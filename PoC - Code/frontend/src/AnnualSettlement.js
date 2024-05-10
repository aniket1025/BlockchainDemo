import React from 'react';
import { Button, Table } from 'react-bootstrap';

const Settlement = ({ settlements, onSettle }) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Subsidiary</th>
                        <th>Balance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {settlements.map(settle => (
                        <tr key={settle.id}>
                            <td>{settle.name}</td>
                            <td>{settle.balance}</td>
                            <td><Button onClick={() => onSettle(settle.id)}>Settle</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Settlement;
