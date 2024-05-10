import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import Web3 from 'web3';

const artifact = require('./GroupcoinToken.json');

const TokenMinting = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', function (accounts) {
                    setAccounts(accounts);
                    console.log("Accounts changed:", accounts);
                });

                window.ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                });

                try {
                    const web3Instance = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);
                    setAccounts(await web3Instance.eth.getAccounts());
                    setContract(new web3Instance.eth.Contract(artifact.abi, '0xC83Ae8281Cd8718cB757EaFB8f4703C6e9A3a1D9'));
                } catch (error) {
                    setMessage("Access to accounts has been denied.");
                    console.error("User denied account access", error);
                }
            } else {
                setMessage("Non-Ethereum browser detected. You should consider trying MetaMask!");
            }
        };

        initWeb3();
    }, []);

    useEffect(() => {
        if (accounts.length > 0) {
            setRecipient(accounts[0]); // Set recipient to the first account in the array
        }
    }, [accounts]);

    const handleSend = async () => {
        if (!web3 || accounts.length === 0) {
            setMessage("Please connect to MetaMask.");
            return;
        }

        if (!amount || !recipient) {
            setMessage("Please fill both fields.");
            return;
        }

        try {
            setLoading(true);
            const receipt = await contract.methods.transfer(recipient, web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
            console.log('Transaction receipt:', receipt);
            setMessage('Transaction successful!');
        } catch (error) {
            console.error('Transaction failed:', error);
            setMessage(`Transaction failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {message && <Alert variant="warning">{message}</Alert>}
            <Form>
                <Form.Group controlId="formRecipient">
                    <Form.Label>Recipient Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter recipient address"
                        value={recipient}
                        onChange={e => setRecipient(e.target.value)}
                        disabled={loading}
                    />
                </Form.Group>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount to Send</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter amount to send"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        disabled={loading}
                    />
                </Form.Group>
                <Button onClick={handleSend} disabled={loading || !accounts.length}>
                    {loading ? 'Sending...' : 'Send Tokens'}
                </Button>
            </Form>
        </Container>
    );
};

export default TokenMinting;
