import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { ethers } from 'ethers';
import contractABI from './GroupcoinToken.json'; // Import the ABI JSON file

const TokenManagement = () => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const onDistributeTokens = async (amount) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = '0x016065F28125019a554a08d187a6CB0bd4D523C1';
            const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

            // Mint tokens
            await contract.mint(signer.getAddress(), amount);

            // Distribute tokens to different accounts
            // Replace the addresses below with actual addresses you want to distribute tokens to
            const recipients = ['recipient1_address', 'recipient2_address', 'recipient3_address'];
            for (const recipient of recipients) {
                await contract.transfer(recipient, amount);
            }

            alert(`Minted and distributed ${amount} tokens successfully.`);
        } catch (error) {
            console.error('Error minting and distributing tokens:', error);
            alert('Failed to mint and distribute tokens. Check console for more details.');
            setError('Failed to mint and distribute tokens. Please try again.');
        }
    };

    const handleDistribution = (event) => {
        event.preventDefault();
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount greater than zero.');
            return;
        }
        setError('');
        onDistributeTokens(parseInt(amount, 10));
        setAmount('');
    };

    return (
        <div>
            <h2>Token Management</h2>
            <Form onSubmit={handleDistribution}>
                <Form.Group>
                    <Form.Label>Amount to Mint and Distribute</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={amount} 
                        onChange={e => setAmount(e.target.value)} 
                        isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="success">Mint and Distribute Tokens</Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </div>
    );
};

export default TokenManagement;
