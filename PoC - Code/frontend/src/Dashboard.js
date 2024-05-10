import React from 'react';
import { Card, Container, Row, Col, Table } from 'react-bootstrap';

const Dashboard = ({ totalTokens, transactions }) => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="mb-3 text-center">
                        <Card.Header as="h5">Dashboard</Card.Header>
                        <Card.Body>
                            <Card.Title>Total Groupcoins Available</Card.Title>
                            <Card.Text>{totalTokens || 'Loading...'}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Transactions</Card.Title>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions && transactions.length > 0 ? (
                                        transactions.map((transaction, index) => (
                                            <tr key={index}>
                                                <td>{transaction.from}</td>
                                                <td>{transaction.to}</td>
                                                <td>{transaction.amount} Groupcoins</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No transactions available or loading...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
