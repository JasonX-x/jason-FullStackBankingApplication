import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useUserData } from '../UserDataContext';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const {totalAmount, withdrawAmount} = useUserData()
  const token = localStorage.getItem('token')
  const handleWithdraw = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      setMessage('Please enter a valid number.');
      setAlertVariant('danger');
    } else if (numAmount <= 0) {
      setMessage('The withdrawal amount must be positive.');
      setAlertVariant('danger');
    } else if (numAmount > totalAmount) {
      setMessage('Insufficient funds for this withdrawal.');
      setAlertVariant('warning');
    } else {
      fetch('http://localhost:3000/users/withdraw', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount})
    })
    .then((res)=>res.json())
    .then((data)=>{
      withdrawAmount(data.balance);
      setMessage(`Deposit of $${numAmount} was successful!`);
      setMessage(`Withdrawal of $${numAmount} was successful!`);
      setAlertVariant('success');
      setAmount(''); 
    })
    }
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
    setMessage(''); 
  };

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Withdraw</Card.Title>
        <Card.Text>
          Current Balance: ${totalAmount.toFixed(2)}
        </Card.Text>
        {message && <Alert variant={alertVariant}>{message}</Alert>}
        <Form onSubmit={handleWithdraw}>
          <Form.Group className="mb-3" controlId="withdrawAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter withdrawal amount"
              value={amount}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!amount}>
            Withdraw
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Withdraw;
